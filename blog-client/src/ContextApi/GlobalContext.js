import {createContext, useState} from "react";
import {getLocalUserData} from "../utilities/localStorage";

export const GlobalContext = createContext();

export default function GlobalStore({children}) {
    const localUser = getLocalUserData();

    const [user, setUser] = useState(localUser);



    const [modalData, setModalData] = useState({
        show: false,
        message: null,
        error: false
    });

    return (
        <GlobalContext.Provider value={{user, setUser, modalData, setModalData}}>
            {children}
        </GlobalContext.Provider>
    );
}