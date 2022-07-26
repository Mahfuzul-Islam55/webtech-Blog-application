import React, {useState} from 'react'
import axiosClient from "../api/axiosClient";
import {useContext} from "react";
import {GlobalContext} from "../ContextApi/GlobalContext";
import {saveTokenLocally} from "../utilities/localStorage";

const Registration = () => {

    const initialState = {name: '', account: '', username: '', password: '', cf_password: ''}
    const [userRegister, setUserRegister] = useState(initialState)
    const {name, account, username, password, cf_password} = userRegister


    const {setModalData} = useContext(GlobalContext);

    const handleChangeInput = (e) => {
        const {value, name} = e.target
        setUserRegister({...userRegister, [name]: value})
    }

    function login() {
        axiosClient.post("/api/services/login",
            {
                email: account,
                password
            })
            .then(function (response) {
                console.log("MHSLOG : response login ->>  ", response);
                setModalData({
                    show: true,
                    message: "Logged in successfully",
                    error: false
                });

                saveTokenLocally(response.data.access_token);
                window.location.href = "/";
            })
            .catch(function (error) {
                console.log("MHSLOG : login error  ->>  ", error);
                setModalData({
                    show: true,
                    message: "Incorrect Email or password",
                    error: true
                });
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.post("/api/services", {
            name, email: account, username, password,
        }).then(response => {
            console.log("MHSLOG : response ->>  ", response);
            setModalData({
                show: true,
                message: response.data.message,
                error: false
            });
            login();
        }).catch(error => {
            console.log("MHSLOG : error ->>  ", error);
            setModalData({
                show: true,
                message: error.message,
                error: true
            });
        })
    }


    return (

        <form onSubmit={handleSubmit} style={{width: "50%", marginLeft: "25%", marginTop: "10%"}}>
            <h1 align="center">Registration Page</h1>
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
                <label htmlFor="username" className='form-label'>User Name</label>
                <input type="text" className='form-control' id='username' name='username'
                       value={username} onChange={handleChangeInput}/>
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
                    disabled={(name && account && password && cf_password) ? false : true}>Register
            </button>

        </form>
    )
}

export default Registration