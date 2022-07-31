import './App.css';
import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import Addproduct from './Addproduct';
import Product from './Product';
import Home from './Home';
import Header from './Header';
function App() {
  return (
<>
  <Header/>
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/addproduct" element={<Addproduct />}/>
      <Route path="/product/:slug" element={<Product />}/>
    </Routes>
</>
  )
}

export default App;
