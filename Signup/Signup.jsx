import React from "react";
import "./Signup.css"
// import {useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [input, setInput] = useState({ email: "", password: "", confirm_password: "" })
  const Navigate = useNavigate()
  const SignupSubmit = (e) => {
console.log(input)
    if (validateUser(input)) {
      axios.post("http://localhost:4000/api/v1/register", input).then((res) => {
        console.log(res.status)
        if (res.status === 200) {
          alert("registered succesfully")
          Navigate("/login")
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
  let validateUser = (value) => {
    if (!value.email) {
      alert('email is required')
      return 0
    } else if (!value.password) {
      alert('password is required')
      return 0
    }
    else if (value.password.length < 6) {
      alert('length of password greater than 6')
      return 0
    }
    else if (value.password.length > 10) {
      alert('length of password smaller than 10')
      return 0
    }
    else if (!value.confirm_password) {
      alert('confirmpassword is required')
      return 0
    }
     else if (value.password !== value.confirm_password) {
      alert('password doesnt match')
      return 0
    }
    return 1
  }
  return (
    <div className="login-container">
      <h1>Signup</h1>
      <div className="email-container">
        <label>Email</label>
        <input type="text" id="email-input" onChange={(e) => { setInput({ ...input, email: e.target.value }) }} />
      </div>
      <div className="pass-container">
        <label>Password</label>
        <input type="text" id="pass-input" onChange={(e) => { setInput({ ...input, password: e.target.value }) }} />
      </div>
      <div className="pass-container">
        <label>Confirm Password</label>
        <input type="text" id="pass-input" onChange={(e) => { setInput({ ...input, confirm_password: e.target.value }) }} />
      </div>
      <button id="login-btn" onClick={SignupSubmit}>Signup</button>
      <span>Already have account?</span>
      <span>
        <Link to="/login">login</Link></span>

    </div>
  )
}
export default Signup;