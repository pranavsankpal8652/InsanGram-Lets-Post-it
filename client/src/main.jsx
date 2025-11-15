import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./Components/Register.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import Forgotpass from "./Components/ForgotPass.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Home from "./Components/Home.jsx";
import PostCreation from "./Components/User_Pages/PostCreation.jsx";
import UserPostsManager from "./Components/User_Pages/ManagePosts.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forgotpass/:token?" element={<Forgotpass />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/create/:id?" element={<PostCreation />}></Route>
        <Route path="/manage" element={<UserPostsManager />}></Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
