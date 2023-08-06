import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingScreen = () => {
    
    return (
        <>
            <div className="loadingScreen">
                <div className="logoDiv">
                    <img src={"/ScrumPokerShowdownLogo.png"} alt="Scrum Poker Logo" id="homeScreenLogo" />
                </div>
                <FontAwesomeIcon icon={faSpinner} spin className="loadingSpin"/>
            </div>
        </>
        
    );
};

export default LoadingScreen;
