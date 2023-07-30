import React, {useContext, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import Layout from "./components/Layout";
import {GetSignalRConnection} from "./SignalRHelper";
import GameContext from "./contexts/GameContext";
import ClientIdContext from "./contexts/ClientIdContext";

const App = () => {
    const {updateGameContext} = useContext(GameContext)
    const {updateClientIdContext} = useContext(ClientIdContext)
    let connection = GetSignalRConnection()
    
    //Signal r lines in App.js are happening repeatedly. 
    // Related to updating clientContextId, but it’s creating a new connection every time and 
    // therefore changing the connection ID every second. Need to find a way for it to happen once, 
    // but using useEffect [] causes order of execution issues
    
    connection.start().then(() => updateClientIdContext(connection.connectionId))

    connection.on("ReceiveUpdatedGameModel", (data) => {
        console.log("yep", data.json())
        updateGameContext(data.json())
    })
    
    return (
        <Layout>
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