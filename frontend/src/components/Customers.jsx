import React, { useEffect, useState } from "react";
import { fetchData } from "../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchData("customers").then(setCustomers);
  }, []);

  const addCustomer = async (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return;

    const res = await fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    const data = await res.json();
    setCustomers([...customers, data]); 
    setNewCustomer({ name: "", email: "" });
  };

  const deleteCustomer = async (id) => {
    await fetch(`http://localhost:5000/api/customers/${id}`, { method: "DELETE" });
    setCustomers(customers.filter(c => c.id !== id));
  };

  const startEdit = (customer) => {
    setEditing(customer.id);
    setEditData({ name: customer.name, email: customer.email });
  };

  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    const updated = await res.json();
    setCustomers(customers.map(c => (c.id === id ? updated : c)));
    setEditing(null); 
  };

  return (
    <div>
      <h3>Customers</h3>


      <ul>
  {customers.map(c => (
    <li key={c.id}>
      {editing === c.id ? (
        <div>
          <input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <input
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
          <button type="button" onClick={() => saveEdit(c.id)}>Save</button>
          <button type="button" onClick={() => setEditing(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          {c.name} ({c.email})
          <button type="button" onClick={() => startEdit(c)}>Edit</button>
          <button type="button" onClick={() => deleteCustomer(c.id)}>Delete</button>
        </div>
      )}
    </li>
  ))}
</ul>

      <div className="form-section">
        <h3>Add Customer</h3>
        <form onSubmit={addCustomer}>
          <div className="form-row">
            <label>Name:</label>
            <input
              placeholder="Name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label>Email:</label>
            <input
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
          </div>
          <button type="submit">Add Customer</button>
        </form>
      </div>
    </div>
  );
}
