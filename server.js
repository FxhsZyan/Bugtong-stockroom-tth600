const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stockroom_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// GET - Retrieve products
app.get("/api/products", (req, res) => {
    const sql = `
        SELECT id, name, sku, category, quantity,
               reorder_level AS reorderLevel,
               unit_price AS unitPrice
        FROM products
        ORDER BY name
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
    });
});

// POST - Insert product
app.post("/api/products", (req, res) => {
    const { name, sku, category, quantity, reorderLevel, unitPrice } = req.body;

    if (!name || !sku || !category ||
        quantity == null || reorderLevel == null || unitPrice == null) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `
        INSERT INTO products (name, sku, category, quantity, reorder_level, unit_price)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, sku, category, quantity, reorderLevel, unitPrice], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.status(201).json({
            message: "Product added successfully",
            id: result.insertId
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});