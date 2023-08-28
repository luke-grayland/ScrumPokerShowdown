import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import Layout from "./components/Layout";
import {GetSignalRConnection, SignalRConnectionIdKey} from "./SignalRHelper";

const App = () => {
    const [clientId, setClientId] = useState()
    const [clientConnection, setClientConnection] = useState()
    
    useEffect(() => {
        const newClient = GetSignalRConnection()
        newClient.start().then(() => {
            setClientConnection(newClient)
            setClientId(newClient.connectionId)
            window.localStorage.setItem(SignalRConnectionIdKey, newClient.connectionId);
        })
    },[])
    
    return (
        <Layout clientId={clientId} clientConnection={clientConnection}>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </Layout>
    )
}

export default App