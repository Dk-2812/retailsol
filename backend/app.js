const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
function readData(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data", file)));
}

function writeData(file, data) {
  fs.writeFileSync(path.join(__dirname, "data", file), JSON.stringify(data, null, 2));
}

app.get("/api/customers", (req, res) => {
  res.json(readData("customers.json"));
});


app.post("/api/customers", (req, res) => {
  const customers = readData("customers.json");
  const newCustomer = { id: Date.now(), ...req.body };  
  customers.push(newCustomer);
  writeData("customers.json", customers);
  res.status(201).json(newCustomer);  
});

app.put("/api/customers/:id", (req, res) => {
  const customers = readData("customers.json");
  const index = customers.findIndex(c => c.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Customer not found" });
  customers[index] = { ...customers[index], ...req.body };
  writeData("customers.json", customers);
  res.json(customers[index]);
});

app.delete("/api/customers/:id", (req, res) => {
  let customers = readData("customers.json");
  customers = customers.filter(c => c.id != req.params.id);
  writeData("customers.json", customers);
  res.json({ message: "Customer deleted" });
});

app.get("/api/products", (req, res) => {
  res.json(readData("products.json"));
});

app.post("/api/products", (req, res) => {
  const products = readData("products.json");
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData("products.json", products);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const products = readData("products.json");
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  products[index] = { ...products[index], ...req.body };
  writeData("products.json", products);
  res.json(products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  let products = readData("products.json");
  products = products.filter(p => p.id != req.params.id);
  writeData("products.json", products);
  res.json({ message: "Product deleted" });
});


app.get("/api/sales", (req, res) => {
  res.json(readData("sales.json"));
});

app.post("/api/sales", (req, res) => {
  const sales = readData("sales.json");
  const newSale = { id: Date.now(), ...req.body };
  sales.push(newSale);
  writeData("sales.json", sales);
  res.status(201).json(newSale);
});

app.put("/api/sales/:id", (req, res) => {
  const sales = readData("sales.json");
  const index = sales.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Sale not found" });
  sales[index] = { ...sales[index], ...req.body };
  writeData("sales.json", sales);
  res.json(sales[index]);
});

app.delete("/api/sales/:id", (req, res) => {
  let sales = readData("sales.json");
  sales = sales.filter(s => s.id != req.params.id);
  writeData("sales.json", sales);
  res.json({ message: "Sale deleted" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
