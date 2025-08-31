import React, { useEffect, useState } from "react";
import { fetchData } from "../services/api";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ customerId: "", productId: "", amount: "" });
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ customerId: "", productId: "", amount: "" });

  useEffect(() => {
    fetchData("sales").then(setSales);
  }, []);

  const addSale = async () => {
    if (!newSale.customerId || !newSale.productId || !newSale.amount) return;
    const res = await fetch("http://localhost:5000/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newSale,
        customerId: Number(newSale.customerId),
        productId: Number(newSale.productId),
        amount: Number(newSale.amount),
      }),
    });
    const data = await res.json();
    setSales([...sales, data]);
    setNewSale({ customerId: "", productId: "", amount: "" });
  };

  const deleteSale = async (id) => {
    await fetch(`http://localhost:5000/api/sales/${id}`, { method: "DELETE" });
    setSales(sales.filter(s => s.id !== id));
  };

  const startEdit = (sale) => {
    setEditing(sale.id);
    setEditData({
      customerId: sale.customerId,
      productId: sale.productId,
      amount: sale.amount,
    });
  };

  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/api/sales/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    const updated = await res.json();
    setSales(sales.map(s => (s.id === id ? updated : s)));
    setEditing(null);
  };

  return (
    <div>
      <ul>
        {sales.map(s => (
          <li key={s.id}>
            {editing === s.id ? (
              <div>
                <input
                  type="number"
                  value={editData.customerId}
                  onChange={(e) => setEditData({ ...editData, customerId: e.target.value })}
                  placeholder="Customer ID"
                />
                <input
                  type="number"
                  value={editData.productId}
                  onChange={(e) => setEditData({ ...editData, productId: e.target.value })}
                  placeholder="Product ID"
                />
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  placeholder="Amount"
                />
                <button onClick={() => saveEdit(s.id)}>Save</button>
              </div>
            ) : (
              <div>
                Sale #{s.id}: Customer {s.customerId}, Product {s.productId}, Amount ${s.amount}
                <button onClick={() => startEdit(s)}>Edit</button>
                <button onClick={() => deleteSale(s.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="form-section">
        <h3>Add Sale</h3>
        <div className="form-row">
          <label>Customer ID:</label>
          <input
            type="number"
            placeholder="Customer ID"
            value={newSale.customerId}
            onChange={(e) => setNewSale({ ...newSale, customerId: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Product ID:</label>
          <input
            type="number"
            placeholder="Product ID"
            value={newSale.productId}
            onChange={(e) => setNewSale({ ...newSale, productId: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Amount:</label>
          <input
            type="number"
            placeholder="Amount"
            value={newSale.amount}
            onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
          />
        </div>
        <button onClick={addSale}>Add Sale</button>
      </div>
    </div>
  );
}
