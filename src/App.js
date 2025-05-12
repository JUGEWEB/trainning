import React, { useState, useEffect } from "react";
import { auth } from "./components/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Route, Routes } from "react-router-dom";  // Import React Router
import "./App.css"; // Import the CSS file

import ProductHeaderImage from "./components/productHeaderImage";
import ThemeAndInfo from "./components/themeAndInfo";
import UploadZone from "./components/uploadZone";
import Product from "./components/product";
import UserPayment from "./components/userPayement";
import ItemInfo from "./components/itemInfo";
import UserInfo from "./components/userInfo";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Scroll to top when the component is rendered or user state changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [user]); // This will trigger the scroll when the user state is updated

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error("Login Error: ", error);
        alert("Login failed. Please try again.");
      });
  };


  return user ?(
    <>
   
    <Routes>
    <Route path="/" element={<Product  />} />
    <Route path="/typeimage" element={<ProductHeaderImage  />} />
    <Route path="/themeandinfo" element={<ThemeAndInfo  />} />
    <Route path="/uploadzone" element={<UploadZone />} />
    <Route path="/userorder" element={<UserPayment />} />
    <Route path="/getiteminformation" element={<ItemInfo />} />
     <Route path="/user-informationtx/:transactionHash" element={<UserInfo />} />
    </Routes>
    
    </>
  ) : (
    <div className="log">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inptim"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inptin"
      />
      <button className="bttn" onClick={handleLogin}>Log in</button>
    </div>
    
    
  );
};

export default App;
