
require("dotenv").config();

const express = require("express");
const path = require("path");
const cassandra = require("cassandra-driver");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Cassandra connection
const client = new cassandra.Client({
  contactPoints: [
    process.env.CASSANDRA_CONTACT_POINT || "127.0.0.1"
  ],
  localDataCenter:
    process.env.CASSANDRA_LOCAL_DATACENTER || "datacenter1",
  keyspace: process.env.CASSANDRA_KEYSPACE || "ecommerce"
});

// Test the database connection
async function startServer() {
  try {
    await client.connect();

    console.log("Connected to Cassandra successfully!");
    console.log("Keyspace: ecommerce");

    app.listen(PORT, () => {
      console.log(`Website running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Cassandra connection failed:");
    console.error(error.message);
    console.error(
      "Check that Cassandra is running and port 9042 is accessible."
    );
    process.exit(1);
  }
}

// Connection status API
app.get("/api/health", async (req, res) => {
  try {
    await client.execute("SELECT release_version FROM system.local");

    res.json({
      status: "success",
      message: "Cassandra is connected",
      keyspace: "ecommerce"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.get("/api/customers", async (req, res) => {
  try {
    const result = await client.execute(
      "SELECT * FROM customers"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
});

app.post("/api/customers", async (req, res) => {
  try {
    const { customer_name, email, city } = req.body;

    const id = cassandra.types.Uuid.random();

    await client.execute(
      `INSERT INTO customers
       (customer_id, customer_name, email, city)
       VALUES (?, ?, ?, ?)`,
      [id, customer_name, email, city],
      { prepare: true }
    );

    res.status(201).json({
      message: "Customer saved",
      customer_id: id.toString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
});


// Get products
app.get("/api/products", async (req, res) => {
  try {
    const result = await client.execute(
      "SELECT * FROM products"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to fetch products"
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { product_name, category, price } = req.body;
    const productPrice = Number(price);

    if (
      !product_name?.trim() ||
      !category?.trim() ||
      price === "" ||
      price === undefined ||
      !Number.isFinite(productPrice) ||
      productPrice < 0
    ) {
      return res.status(400).json({
        message: "Enter a valid product name, category, and price."
      });
    }

    const productId = cassandra.types.Uuid.random();

    const query = `
      INSERT INTO products
      (product_id, product_name, category, price)
      VALUES (?, ?, ?, ?)
    `;

    await client.execute(
      query,
      [
        productId,
        product_name.trim(),
        category.trim(),
        cassandra.types.BigDecimal.fromString(
          productPrice.toFixed(2)
        )
      ],
      { prepare: true }
    );

    res.status(201).json({
      message: "Product added successfully!",
      product_id: productId.toString()
    });
  } catch (error) {
    console.error("Product insert error:", error);

    res.status(500).json({
      message: "Failed to add product.",
      error: error.message
    });
  }
});


app.get("/api/orders", async (req, res) => {
  try {
    const { customer_id } = req.query;

    if (!customer_id) {
      return res.status(400).json({
        message: "Customer ID is required."
      });
    }

    const query = `
      SELECT customer_id, order_date, order_id,
             product_name, quantity, amount
      FROM orders
      WHERE customer_id = ?
    `;

    const result = await client.execute(
      query,
      [cassandra.types.Uuid.fromString(customer_id)],
      { prepare: true }
    );

    const orders = result.rows.map((row) => ({
      customer_id: row.customer_id.toString(),
      order_date: row.order_date.toString(),
      order_id: row.order_id.toString(),
      product_name: row.product_name,
      quantity: row.quantity,
      amount: row.amount.toString()
    }));

    res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders.",
      error: error.message
    });
  }
});


app.post("/api/orders", async (req, res) => {
  try {
    const {
      customer_id,
      order_date,
      product_name,
      quantity,
      amount
    } = req.body;

    const qty = Number(quantity);
    const total = Number(amount);

    if (
      !customer_id ||
      !order_date ||
      !product_name?.trim() ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      amount === "" ||
      amount === undefined ||
      !Number.isFinite(total) ||
      total < 0
    ) {
      return res.status(400).json({
        message: "Please enter valid order details."
      });
    }

    const customerId =
      cassandra.types.Uuid.fromString(customer_id);

    const orderId = cassandra.types.Uuid.random();

    const date =
      cassandra.types.LocalDate.fromString(order_date);

    const query = `
      INSERT INTO orders
      (customer_id, order_date, order_id,
       product_name, quantity, amount)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await client.execute(
      query,
      [
        customerId,
        date,
        orderId,
        product_name.trim(),
        qty,
        cassandra.types.BigDecimal.fromString(
          total.toFixed(2)
        )
      ],
      { prepare: true }
    );

    res.status(201).json({
      message: "Order added successfully!",
      order_id: orderId.toString()
    });
  } catch (error) {
    console.error("Order insert error:", error);

    res.status(500).json({
      message: "Failed to add order.",
      error: error.message
    });
  }
});
 
startServer();
