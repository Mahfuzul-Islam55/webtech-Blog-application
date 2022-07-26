import {Link} from "react-router-dom";

import {GlobalContext} from "../ContextApi/GlobalContext";
import {useContext, useState} from "react";
import {removeLocalToken, removeLocalUser} from "../utilities/localStorage";
import axiosClient from "../api/axiosClient";

export default function CustomNavbar() {

    const {user, modalData, setModalData, setUser} = useContext(GlobalContext);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [showModal, setShowModal] = useState(false);

    function onChange(e) {
        if (e.target.name === "title") setTitle(e.target.value);
        if (e.target.name === "body") setBody(e.target.value);
    }

    function logout() {
        removeLocalToken();
        removeLocalUser();
        setModalData({
            show: true,
            message: "Logged out",
            error: false
        });
        setUser(null);
    }

    function createBlog() {
        axiosClient.post("/api/services/post", {
            title, body
        }).then((response) => {
            window.location.href = "/"
        }).catch((response) => setModalData({
            show: true,
            error: true,
            message: response.data.message
        }));
    }

    return (
        <nav className="navbar bg-light fixed-top">
            <div className="container">
                <a href="/" className="navbar-brand">Blog News</a>
                <div className="d-flex">

                    {
                        user ? <>
                            <button onClick={() => setShowModal(true)} style={{marginRight: "10px"}}
                                    className="btn btn-primary">Create Blog
                            </button>
                            <a href="/profile" style={{marginRight: "10px"}} type="button"
                               className="btn btn-info">Profile</a>
                            <button onClick={logout} className="btn btn-warning">Logout</button>
                        </> : <>
                            <a
                                href="/login" style={{marginRight: "10px"}} type="button"
                                className="btn btn-primary">Login</a>
                            <a href="/registration" type="button"
                               className="btn btn-secondary">Registration</a>
                        </>
                    }


                </div>


                {/*create blog modal */}

                <div className={showModal ? "modal fade show" : "modal fade"}
                     style={showModal ? {display: 'block'} : {display: 'none'}} id="exampleModal" tabIndex="1"
                     aria-labelledby="exampleModalLabel"
                     aria-hidden="true" aria-modal="true" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Blog</h5>
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
                                <button onClick={createBlog} type="button" className="btn btn-primary">Create</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}