import React, {useState} from "react";
import ClientContext from "./ClientContext";

const ClientContextProvider = ({children}) => {
    const [clientContext, setClientContext] = useState()
    
    const updateClientContext = (updatedClient) => setClientContext(updatedClient)
    
    return (
        <ClientContext.Provider value={{clientContext, updateClientContext}}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContextProvider