import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

const LoadingScreen = ({gameIsLoaded}) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        setTimeout(() => {
            if (gameIsLoaded)
                navigate("/game")    
        }, 1000)
    }, [gameIsLoaded])
    
    return (
        <>
            <div className="loadingScreen">
                <div className="logoDiv">
                    <img src="/ScrumPokerShowdownLogo.png" alt="Scrum Poker Logo" id="homeScreenLogo" />
                </div>
                <FontAwesomeIcon icon={faSpinner} spin className="loadingSpin"/>
            </div>
        </>
        
    );
};

export default LoadingScreen;
