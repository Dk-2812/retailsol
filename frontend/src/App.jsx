import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1 className="logo">RetailTech Solutions</h1>
          <ul className="nav-links">
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/sales">Sales</Link></li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<CustomersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/sales" element={<SalesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
