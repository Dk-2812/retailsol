const API_BASE = "http://localhost:5000/api";

export async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  return res.json();
}
