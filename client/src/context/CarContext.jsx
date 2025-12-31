import { createContext, useState } from "react";
import { GetLocalStorage } from "../utils/LocalStorage";

const CarContext = createContext();


const CarProvider = ({children}) => {

    const [carInfo, setCarInfo] = useState(GetLocalStorage("car") || []);
    const [filter, setFilter] = useState([]);

    return (
        <>
            <CarContext.Provider value={{carInfo, setCarInfo, filter, setFilter}}>
                {children}
            </CarContext.Provider>
        </>
    );



}

export { CarProvider, CarContext }