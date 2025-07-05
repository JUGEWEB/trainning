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
import UserPaymentByBrand from "./components/userPayementByBrand";
import UserInfoByBrand from "./components/userInfoByBrand";
import UserPaymentsByBrandMonth from "./components/UserPaymentsByBrandMonth";
import UserPaymentsByBrandWeek from "./components/UserPaymentsByBrandWeek";
import UserPaymentsByYear from "./components/UserPaymentsByYear";
import UserPaymentsByDay from "./components/UserPaymentsByDay";
import PostBrand from "./components/PostBrand";
import ModifyBrandData from "./components/ModifyBrandData";
import FixMissingBrandFields from "./components/fixMissingDependencies";
import SendWhatsAppMessage from "./components/sendWhatsappMessage";
import ZoomAndCategory from "./components/zoomandcategory";
import ContinueLearn from "./components/learnVideoContenue";

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
    <Route path="/post-brand" element={<PostBrand  />} />
    <Route path="/continueLearn" element={<ContinueLearn  />} />
    <Route path="/zoomandcategory" element={<ZoomAndCategory  />} />
     <Route path="/modify-brand" element={< ModifyBrandData />} />
    <Route path="/typeimage" element={<ProductHeaderImage  />} />
    <Route path="/themeandinfo" element={<ThemeAndInfo  />} />
    <Route path="/uploadzone" element={<UploadZone />} />
    <Route path="/userorder" element={<UserPayment />} />
    <Route path="/Whatsapp" element={<SendWhatsAppMessage />} />
     <Route path="/missingDependencies" element={<FixMissingBrandFields />} />
    <Route path="/getiteminformation" element={<ItemInfo />} />
    <Route path="/userBrandPayment" element={<UserPaymentByBrand />} />
     <Route path="/user-informationtx/:transactionHash" element={<UserInfo />} />
     <Route path="/user-informationtx-by-brand/:transactionHash/:itemId" element={<UserInfoByBrand />} />
    <Route path="/user-payments/brand/:brand/year/:year" element={<UserPaymentsByYear />} />
<Route path="/user-payments/brand/:brand/month/:monthKey" element={<UserPaymentsByBrandMonth />} />
<Route path="/user-payments/brand/:brand/week/:weekKey" element={<UserPaymentsByBrandWeek />} />
<Route path="/user-payments/brand/:brand/day/:dayKey" element={<UserPaymentsByDay />} />


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
