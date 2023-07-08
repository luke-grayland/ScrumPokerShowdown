import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import Layout from "./components/Layout";
import GameContextProvider from "./contexts/GameContextProvider";

const App = () => {
    return (
        <GameContextProvider>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>    
        </GameContextProvider>
    )
}

export default App