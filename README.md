# Cassandra E-Commerce Web App

A simple HTML/CSS/JavaScript frontend connected to Apache Cassandra through Node.js and Express.

## Requirements
- Node.js and npm on Windows
- Cassandra running in Ubuntu/WSL on port 9042
- Existing `ecommerce` keyspace with `customers`, `products`, and `orders` tables

## Start Cassandra
In Ubuntu terminal 1:
```bash
cd ~/apache-cassandra-5.0.9
bin/cassandra -f
```
Keep that terminal open.

## Check connection from Windows
Open PowerShell and run:
```powershell
Test-NetConnection 127.0.0.1 -Port 9042
```
If `TcpTestSucceeded` is `True`, continue. If false, send the output before changing Cassandra settings.

## Run the website
1. Extract this ZIP and open the `cassandra-ecommerce-web` folder in VS Code.
2. Open a PowerShell terminal in that folder and run:
```powershell
npm install
```
3. Copy `.env.example` to `.env` (keep the values below for a local WSL Cassandra server):
```dotenv
PORT=3000
CASSANDRA_CONTACT_POINTS=127.0.0.1
CASSANDRA_LOCAL_DATACENTER=datacenter1
CASSANDRA_KEYSPACE=ecommerce
```
4. Run:
```powershell
npm start
```
You should see a Cassandra connection message and `Website running at http://localhost:3000`.
5. Open http://localhost:3000 in your browser.

## Features
- Add and list customers
- Add and list products
- Add orders and find orders by customer UUID
- Show Cassandra connection status

Orders are queried by `customer_id`, the partition key in this schema. Keep Cassandra running while using the site. This is a local learning demo; do not expose the server or database publicly.
