import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [search, setSearch] = useState("");

  const API = "http://localhost:5003/api/products";

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, quantity })
    });

    getProducts();
  };

  const updateProduct = async (id) => {
    await fetch(API + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, quantity })
    });

    getProducts();
  };

  /* DELETE (ADDED) */
  const deleteProduct = async (id) => {
    await fetch(API + "/" + id, {
      method: "DELETE"
    });

    getProducts();
  };

  const searchProduct = async () => {
    const res = await fetch(API + "/search?query=" + search);
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div>
      <h2>Product Inventory</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />

      <button onClick={addProduct}>Add</button>

      <br /><br />

      <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={searchProduct}>Search</button>

      <br /><br />

      <table border="1">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>

        {products.map((p) => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>

            <td>
              <button onClick={() => updateProduct(p._id)}>
                Update
              </button>
            </td>

            <td>
              <button onClick={() => deleteProduct(p._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
