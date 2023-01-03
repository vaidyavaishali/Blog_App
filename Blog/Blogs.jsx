import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Blog.css'
const BlogPage = () => {
  const Navigate = useNavigate()
  const [input, setInput] = useState({ title: "", description: "" , file:""})
  // let formData = new FormData()
  // formData.append()
  console.log(input)
  const token = localStorage.getItem("token")
  const config = {
    headers: { authorization: token}
  }
  const PostData = () => {

    axios.post("http://localhost:4000/api/v1/posts",input, config).then((res) => {
      //  res.json()
      // console.log(token)
      if (res.status === 200) {
        // console.log(res.token)
        // console.log(window.localStorage.setItem("token", res.data.token))
        // console.log(token)
        alert("Create blog succcessfully..!!")
        Navigate('/posts')
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      <div className="login-container">
        <h1>BlogPost</h1>
        <div className="email-container">
          <label>Title</label>
          <input type="text" id="email-input" onChange={(e) => { setInput({ ...input, title: e.target.value }) }} />
        </div>
        <div>
          <span>Desciption</span>
          <textarea rows={3} cols={30} onChange={(e) => { setInput({ ...input, description: e.target.value }) }} ></textarea>
        </div>
        {/* <div >
          <label>Image</label>
          <input type="file" accept='image/*' onChange={(e) => { setInput({ ...input, file: e.target.files[0] }) }} className="img" />
        </div> */}
        <div >
          <label>Image</label>
          <input type="text" onChange={(e) => { setInput({ ...input, file: e.target.value }) }} className="img" />
        </div>
        <button id="login-btn" onClick={PostData}>Post</button>
      </div>
    </>
  )
}
export default BlogPage