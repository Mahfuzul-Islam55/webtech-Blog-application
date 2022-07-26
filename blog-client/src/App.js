import './App.css';
import GlobalStore, {GlobalContext} from "./ContextApi/GlobalContext";
import Router from "./Navigation/Router";
import {useContext, useEffect} from "react";
import axiosClient from "./api/axiosClient";
import {saveUserDataLocally} from "./utilities/localStorage";

function App() {

    return (
        <GlobalStore>
            <Router/>
        </GlobalStore>
    );
}

export default App;
