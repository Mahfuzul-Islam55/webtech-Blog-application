import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../ContextApi/GlobalContext";
import axiosClient from "../api/axiosClient";
import React from "react";

export default function User() {
    const [blogs, setBlogs] = useState(null);

    const {setModalData, user} = useContext(GlobalContext);

    const [blogId, setBlogId] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const initialState = {name: user.name, account: user.email, password: user.password, cf_password: user.password}
    const [userRegister, setUserRegister] = useState(initialState)
    const {name, account, password, cf_password} = userRegister

    const [showModal, setShowModal] = useState(false);

    function onChange(e) {
        if (e.target.name === "title") setTitle(e.target.value);
        if (e.target.name === "body") setBody(e.target.value);
    }

    const handleChangeInput = (e) => {
        const {value, name} = e.target
        setUserRegister({...userRegister, [name]: value})
    }

    function updateBlog() {
        axiosClient.put("/api/services/post/" + blogId, {
            title, body
        }).then((response) => {
            window.location.href = "/"
        }).catch((response) => setModalData({
            show: true,
            error: true,
            message: response.data.message
        }));
    }

    function deleteBlog(id) {
        axiosClient.delete("/api/services/post/" + id).then(response => window.location.href = "/").catch((response) => setModalData({
            show: true,
            error: true,
            message: response.data.message
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.put("/api/services", {
            name, email: account, username: user.username, password,
        }).then(response => {
            console.log("MHSLOG : response ->>  ", response);
            setModalData({
                show: true,
                message: response.data.message,
                error: false
            });
        }).catch(error => {
            console.log("MHSLOG : error ->>  ", error);
            setModalData({
                show: true,
                message: error.response.data.message,
                error: true
            });
        })
    }

    useEffect(function () {
        axiosClient.get("/api/services/post/users/" + user.id).then(function (response) {
            console.log("MHSLOG : all posts ->>  ", response.data);
            setBlogs(response.data.data.reverse());
            setModalData({
                show: true,
                message: "Fetched news blogs successfully",
                error: false
            })
        }).catch(function (error) {
            console.log("MHSLOG : error ->>  ", error);
        })
    }, [])

    return (
        <div className="container" style={{paddingTop: "100px"}}>

            <h1 align="center">User Information</h1>
            <hr/>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input type="text" className='form-control' id='name' name='name'
                           value={name} onChange={handleChangeInput}/>
                </div>

                <div style={{height: "10px"}}></div>

                <div className="form-group">
                    <label htmlFor="account" className='form-label'>Email</label>
                    <input type="text" className='form-control' id='account' name='account'
                           value={account} onChange={handleChangeInput}/>
                </div>

                <div style={{height: "10px"}}></div>

                <div className="form-group">
                    <div className="pass">
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className='form-control' id='password' name='password'
                               value={password} onChange={handleChangeInput}/>
                    </div>
                </div>

                <div style={{height: "10px"}}></div>

                <div className="form-group">
                    <div className="pass">
                        <label htmlFor="password" className='form-label'>Confirm Password</label>
                        <input type="password" className='form-control' id='cf_password'
                               name='cf_password'
                               value={cf_password} onChange={handleChangeInput}/>
                    </div>
                </div>
                <div style={{height: "20px"}}></div>
                <button type='submit' className='btn btn-dark w-100 mt-1'
                        disabled={(name && account && password && cf_password) ? false : true}>Update
                </button>

            </form>

            <div style={{height: "50px"}}>

            </div>

            <h1 align="center">Own Blogs</h1>
            <hr/>
            {
                blogs === null ? <p align="center">Loading blogs......</p> :
                    blogs.length === 0 ? <p align="center">No News Blog Found</p>
                        : blogs.map(function (blog) {
                            return (
                                <div key={blog.id} className="card shadow" style={{margin: "10px"}}>
                                    <div className="card-header" style={{display: "flex", justifyContent: "space-between"}}>
                                        <p>{blog.title}</p>
                                        {
                                            blog.user_id === user.id ? <div>
                                                <button style={{marginRight: "5px"}} onClick={() => {
                                                    setBlogId(blog.id);
                                                    setTitle(blog.title);
                                                    setBody(blog.body);
                                                    setShowModal(true)
                                                }} className="btn btn-secondary">Update
                                                </button>
                                                <button onClick={() => deleteBlog(blog.id)}
                                                        className="btn btn-danger">Delete
                                                </button>
                                            </div> : null
                                        }

                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{blog.body}</p>

                                        <p align="right">Author : <a
                                            href={"/blogs_by/" + blog.user_id + "?username=" + blog.user_name}>{blog.user_name}</a>
                                        </p>
                                        {/*<p align="right">Date : {Date.parse(blog.created_at).toString("DD/MM/YYYY HH:MM")}</p>*/}
                                    </div>
                                </div>
                            )
                        })
            }


            {/*update blog modal */}

            <div className={showModal ? "modal fade show" : "modal fade"}
                 style={showModal ? {display: 'block'} : {display: 'none'}} id="exampleModal" tabIndex="1"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true" aria-modal="true" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Blog</h5>
                            <button onClick={() => setShowModal(false)} type="button" className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title</label>
                                    <input value={title} onChange={onChange} type="text" className="form-control"
                                           id="title" name="title"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="body" className="col-form-label">Body</label>
                                    <textarea value={body} onChange={onChange} className="form-control" id="body"
                                              name="body"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button onClick={updateBlog} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}