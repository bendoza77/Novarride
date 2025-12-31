import { createContext, useState } from "react";
import { GetLocalStorage } from "../utils/LocalStorage";

const UserContext = createContext();

const UserProvider = ({children}) => {

    const [users, setUsers] = useState(GetLocalStorage("users") || []);
    const [curUser, setCurUser] = useState(GetLocalStorage("curUser") || []);

    return (
        <>
            <UserContext.Provider value={{users, setUsers, curUser, setCurUser}}>
                {children}
            </UserContext.Provider>
        </>
    );


}

export { UserContext, UserProvider }