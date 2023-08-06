import React, {useContext, useEffect, useState} from 'react';
import ClientContext from "../contexts/ClientContext";

const Layout = (props) => {
    const {updateClientContext} = useContext(ClientContext)
    
    useEffect(() => {
        if (props.clientId !== undefined && props.clientConnection !== undefined)
        {
            updateClientContext({
                clientId: props.clientId,
                clientConnection: props.clientConnection
            })
        }
    }, [props.clientId, props.clientConnection])
    
    return (
        <main role="main">
            {props.children}
        </main>
    );
}

export default Layout;
