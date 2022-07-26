import CustomNavbar from "../components/CustomNavbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import {GlobalContext} from "../ContextApi/GlobalContext";
import {useContext, useEffect} from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import axiosClient from "../api/axiosClient";
import {getLocalToken, saveUserDataLocally} from "../utilities/localStorage";
import BlogsByUser from "../pages/BlogsByUser";
import User from "../pages/User";

export default function Router() {
    const {user, modalData, setModalData, setUser} = useContext(GlobalContext);
    console.log("MHSLOG : user ->>  ", user, modalData);
    const errorStyle = {
            backgroundColor: "red", color: "white"
        },
        successStyle = {
            backgroundColor: "green", color: "white"
        }
    ;
    useEffect(function () {
        setTimeout(function () {
            setModalData({
                show: false,
            })
        }, 2000);
    }, [modalData.show])

    useEffect(function () {
        if (getLocalToken())
            axiosClient.get("/api/services/profile",)
                .then(function (response) {
                    console.log("MHSLOG : userinfo ->>  ", response.data);
                    saveUserDataLocally(response.data.data);
                    setUser(response.data.data);
                }).catch(function (error) {
                console.log("MHSLOG :userinfo error ->>  ", error);
            })
    }, [])

    return (
        <BrowserRouter>
            <CustomNavbar/>

            <Routes>
                <Route path="/" exact element={user ? <Home/> : <Login/>}/>
                <Route path="/blogs_by/:username" exact element={user ? <BlogsByUser/> : <Login/>}/>
                <Route path="/profile" exact element={user ? <User/> : <Login/>}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/registration" exact element={<Registration/>}/>
            </Routes>
            <div className="toast-container position-absolute bottom-0 end-0 p-3">
                <div id="liveToast" className={modalData.show ? "toast show" : "toast"} role="alert"
                     aria-live="assertive" aria-atomic="true">
                    <div className="toast-body rounded" style={modalData.error ? errorStyle : successStyle}>
                        {modalData.message}
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}