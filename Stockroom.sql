CREATE DATABASE IF NOT EXISTS stockroom_db;
USE stockroom_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    reorder_level INT NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0
);

INSERT INTO products (name, sku, category, quantity, reorder_level, unit_price) VALUES
('Steel Bolt M8x40',     'HW-1001', 'Hardware',    240, 50, 3.50),
('Cable Tie 200mm',      'HW-1042', 'Hardware',    18,  30, 0.75),
('USB-C Cable 1m',       'EL-2005', 'Electronics', 64,  20, 89.00),
('A4 Bond Paper (Ream)', 'OF-3010', 'Office',      12,  15, 175.00),
('Ballpoint Pen (Box)',  'OF-3021', 'Office',      90,  25, 60.00);