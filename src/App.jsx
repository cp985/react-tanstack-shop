import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { VITE_API_URL } = import.meta.env;

      try {
        console.log("Fetching data...");
        const response = await fetch(`${VITE_API_URL}/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Data fetched");
        setProducts(data);
        console.log("render data", data);
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching data: " + error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <ul className="dummy-product-list">
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <img src={product.imageUrl} alt={product.name} />
              <p>{product.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
