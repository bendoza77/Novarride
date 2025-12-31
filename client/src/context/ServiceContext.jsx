import { createContext, useState } from "react";
import { GetLocalStorage } from "../utils/LocalStorage";

const ServiceContext = createContext();

const ServiceProvider = ({children}) => {

    const [serviceInfo, setServiceInfo] = useState(GetLocalStorage("service") || []);

    return (
        <>
            <ServiceContext.Provider value={{serviceInfo, setServiceInfo}} >
                {children}
            </ServiceContext.Provider>
        </>
    );



}

export { ServiceContext, ServiceProvider }