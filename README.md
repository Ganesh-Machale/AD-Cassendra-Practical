Apache Cassandra Practicals

A practical learning repository covering Apache Cassandra, a distributed NoSQL database designed to handle large volumes of data with high availability, scalability, and fault tolerance.

This repository contains practical implementations and exercises focused on Cassandra database management, CQL queries, keyspaces, tables, and data manipulation.

📌 About the Project

Apache Cassandra is a distributed, wide-column NoSQL database that provides high availability and scalability across multiple nodes.

The purpose of this repository is to understand Cassandra's architecture, learn Cassandra Query Language (CQL), and gain practical experience working with a NoSQL database.

🎯 Objectives

- Understand Apache Cassandra fundamentals.
- Learn Cassandra architecture.
- Create and manage keyspaces.
- Create tables and define primary keys.
- Perform CRUD operations using CQL.
- Insert, retrieve, update, and delete records.
- Understand partition keys and clustering columns.
- Explore distributed database concepts.
- Practice Cassandra database administration.

🛠️ Technologies Used

Technology| Purpose
Apache Cassandra| Distributed NoSQL database
CQL| Cassandra Query Language
CQLSH| Cassandra command-line interface
Java| Cassandra runtime requirement
Ubuntu / Linux| Development environment
WSL| Linux environment on Windows

📚 Topics Covered

1. Introduction to Cassandra

- What is Apache Cassandra?
- Features of Cassandra.
- NoSQL database concepts.
- Cassandra vs relational databases.

2. Keyspace Management

Create a keyspace:

CREATE KEYSPACE college
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

Use the keyspace:

USE college;

Display available keyspaces:

DESCRIBE KEYSPACES;

3. Table Creation

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name TEXT,
    department TEXT,
    age INT
);

Display table information:

DESCRIBE TABLE students;

4. Insert Records

INSERT INTO students
(student_id, name, department, age)
VALUES
(1, 'Ganesh', 'Computer Engineering', 21);

5. Retrieve Records

SELECT * FROM students;

Retrieve a particular student:

SELECT * FROM students
WHERE student_id = 1;

6. Update Records

UPDATE students
SET age = 22
WHERE student_id = 1;

7. Delete Records

DELETE FROM students
WHERE student_id = 1;

8. Drop a Table or Keyspace

DROP TABLE students;

DROP KEYSPACE college;

Note: These are illustrative CQL examples. Execute destructive commands carefully because they permanently remove database objects or records.

🚀 Installation and Setup

Prerequisites

- Java (compatible with your Cassandra version).
- Apache Cassandra.
- CQLSH.
- Ubuntu or another supported operating system.

Step 1: Clone the Repository

git clone https://github.com/Ganesh-Machale/AD-Cassendra-Practical.git

Step 2: Navigate to the Repository

cd AD-Cassendra-Practical

Step 3: Start Cassandra

Start your Cassandra service according to your operating system and installation method.

For Ubuntu installations using systemd:

sudo systemctl start cassandra

Step 4: Open CQLSH

cqlsh

Step 5: Execute Practical Queries

Open the practical files and execute their CQL commands using the Cassandra Query Language shell.

🧠 Important Cassandra Concepts

Concept| Description
Keyspace| Logical container for tables
Table| Stores structured data
Partition Key| Determines data distribution
Clustering Column| Determines ordering within a partition
CQL| Cassandra Query Language
Replication| Maintains multiple copies of data
Node| Individual Cassandra server
Cluster| Collection of connected Cassandra nodes
Ring Architecture| Distribution of data across nodes

🔍 Cassandra vs SQL Databases

Feature| Cassandra| Relational Database
Database Type| NoSQL| Relational
Data Model| Wide-column| Tables and relations
Schema| Flexible but defined per table| Structured
Scalability| Horizontal| Depends on database architecture
Query Language| CQL| SQL
Relationships| Generally handled through data modeling| Foreign keys and joins

🎓 Learning Outcomes

Through these practical exercises, I developed an understanding of:

- NoSQL database fundamentals.
- Cassandra installation and configuration.
- Keyspace and table management.
- CQL query execution.
- CRUD operations.
- Primary keys and partitioning.
- Distributed database architecture.
- Data replication and availability.

🔮 Future Learning Scope

- Cassandra replication strategies.
- Multi-node cluster configuration.
- Consistency levels.
- Secondary indexes.
- Materialized views.
- Batch operations.
- Cassandra performance optimization.
- Integration of Cassandra with Java and Node.js.

👨‍💻 Author

Ganesh Machale

B.Tech – Computer Science & Engineering
MIT Art, Design and Technology University, Pune

GitHub: "Ganesh-Machale" (https://github.com/Ganesh-Machale)

🔗 Repository

"AD-Cassendra-Practical – GitHub" (https://github.com/Ganesh-Machale/AD-Cassendra-Practical)

⭐ Support

If you find this repository helpful for learning Apache Cassandra and NoSQL database concepts, consider giving it a star.

---

Developed by Ganesh Machale | Learning Distributed Databases with Apache Cassandra.
