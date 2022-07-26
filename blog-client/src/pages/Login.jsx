import React, {useContext, useEffect, useState} from 'react'
import axiosClient from "../api/axiosClient";
import {GlobalContext} from "../ContextApi/GlobalContext";
import {saveTokenLocally, saveUserDataLocally} from "../utilities/localStorage";

const Login = () => {
    const {user} = useContext(GlobalContext)
    const initialState = {account: '', password: ''}
    const [userLogin, setUserLogin] = useState(initialState)
    const {account, password} = userLogin;

    const {setModalData} = useContext(GlobalContext);

    const handleChangeInput = (e) => {
        const {value, name} = e.target
        setUserLogin({...userLogin, [name]: value})
    }

    useEffect(function () {
        if (user) window.location.href = "/";
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("MHSLOG : userLogin ->>  ", {
            email: account,
            password
        });
        axiosClient.post("/api/services/login", {
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
            }).catch(function (error) {
            console.log("MHSLOG : login error  ->>  ", error);
            setModalData({
                show: true,
                message: "Incorrect Email or password",
                error: true
            });
        })
    }


    return (

        <form onSubmit={handleSubmit} style={{width: "50%", marginLeft: "25%", marginTop: "10%"}}>
            <h1 align="center">Login Page</h1>
            <div className="form-group">
                <label htmlFor="account" className='form-label'>User Email</label>
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
            <div style={{height: "40px"}}></div>
            <button type='submit' className='btn btn-dark w-100 mt-1'
                    disabled={(account && password) ? false : true}>Login
            </button>

        </form>
    )
}

export default Login