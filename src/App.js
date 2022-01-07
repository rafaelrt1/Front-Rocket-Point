import "./App.css";
import Product from "./components/Product";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import Register from "./components/Register";

export default function App() {
  async function getProducts() {
    try {
      const url = 'http://localhost:5000/products';
      let result = await fetch(url, { mode: 'cors' })
      let products = await result.json();
      setProducts(products);
    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Product products={products} />} />
          <Route path="details/:id" element={<ProductDetails id={products} />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}