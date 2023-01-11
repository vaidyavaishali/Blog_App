import React from "react";
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
function Login() {
  const [input, setInput] = useState({ email: "", password: "" })
  const Navigate = useNavigate()

  const LoginSubmit = () => {
    axios.post("https://blog-app-backend-36zq.onrender.com/api/v1/login", input).then((res) => {
      console.log(input)
      if (res.status === 200) {
        alert("Login SuccessFully")
        console.log(res.data.token)

        window.localStorage.setItem("token", res.data.token)
        Navigate('/posts')
        // window.localStorage.setItem("token", res.data.token)
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="login-container">
      <h1>LogIn</h1>
      <div className="email-container">
        <label>Email</label>
        <input type="text" id="email-input" onChange={(e) => { setInput({ ...input, email: e.target.value }) }} />
      </div>
      <div className="pass-container">
        <label>Password</label>
        <input type="text" id="pass-input" onChange={(e) => { setInput({ ...input, password: e.target.value }) }} />
      </div>
      <input type="checkbox" />
      <span>Remember me?</span>
      <button id="login-btn" onClick={LoginSubmit}>LogIn</button>
      <span className="sp">forgot Password?</span>
      <span className="sp">need an account?<Link to="/">Signup</Link></span>
    </div>
  )
}
export default Login;
