import React, { useEffect, useState } from "react";
import { fetchData } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchData("products").then(setProducts);
  }, []);

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProduct, price: Number(newProduct.price) }),
    });
    const data = await res.json();
    setProducts([...products, data]);
    setNewProduct({ name: "", price: "" });
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };

  const startEdit = (product) => {
    setEditing(product.id);
    setEditData({ name: product.name, price: product.price });
  };

  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    const updated = await res.json();
    setProducts(products.map(p => (p.id === id ? updated : p)));
    setEditing(null);
  };

  return (
    <div>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {editing === p.id ? (
              <div>
                <input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                />
                <button onClick={() => saveEdit(p.id)}>Save</button>
              </div>
            ) : (
              <div>
                {p.name} - ${p.price}
                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="form-section">
        <h3>Add Product</h3>
        <div className="form-row">
          <label>Name:</label>
          <input
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Price:</label>
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </div>
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
}
