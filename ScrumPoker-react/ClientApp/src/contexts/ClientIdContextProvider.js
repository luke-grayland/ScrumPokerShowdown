import React, {useState} from "react";
import ClientIdContext from "./ClientIdContext";

const ClientIdContextProvider = ({children}) => {
    const [clientIdContext, setClientIdContext] = useState()
    
    const updateClientIdContext = (updatedClientId) => setClientIdContext(updatedClientId)

    return (
        <ClientIdContext.Provider value={{clientIdContext, updateClientIdContext}}>
            {children}
        </ClientIdContext.Provider>
    )
}

export default ClientIdContextProvider