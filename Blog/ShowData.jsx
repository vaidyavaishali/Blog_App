import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Blog.css'
const ShowData = () => {
    const [blogData, setBlogData] = useState([])
    useEffect(() => {
        const token = window.localStorage.getItem("token")

        const config = {
            headers: {
                authorization: token
            }
        }

        axios.get("https://blog-app-backend-36zq.onrender.com/api/v1/posts", config).then((res) => {
            setBlogData(res.data.users)
        }).catch((e) => {
            console.log(e)
        })
        // fetch("http://localhost:8000/getpost", { method: "get", headers: { authorization: token } }).then((res) => {
        //     return res.json()
        // }).then((data) => {
        //     setBlogData(data.blog_posts)
        // }).catch((e) => {
        //     console.log(e)
        // })
    }, [])


    const Navigate = useNavigate()
    const Logout = () => {
        window.localStorage.removeItem("token")
        Navigate('/login')
    }
    return (
        <><div>
            <nav id="header">
                <h1>BlogPosts</h1>
                <div id="post">
                    <span className="link">home</span>
                    <Link to="/blog"><span className="link">create</span></Link>
                    <span onClick={Logout} className="link">logout</span>
                </div>
            </nav>
            <div >{blogData.map((items, i) => {
                return (

                    <div id="show" key={i}>
                        <h3>Title:- {items.title}</h3>
                        <p><b>Desc:-</b> {items.description}</p>
                        <p><b>Image_URL:-</b>{items.file}</p>
                    </div>
                )
            })
            }

            </div>
        </div>

        </>

    )
}
export default ShowData