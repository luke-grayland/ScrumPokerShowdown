import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ImageFadeIn from "react-image-fade-in";
import {LocalGameContextKey} from "../GameScreen/GameScreenHelper";
import {useLocation, useNavigate} from "react-router-dom";

const LoadingScreen = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fromHome = location.state?.fromHome

        if(!fromHome)
            navigate("/")

        window.localStorage.removeItem(LocalGameContextKey)
    }, [])
    
    return (
        <div className="loadingScreen">
            <div className="logoDiv">
                <ImageFadeIn src={"/ScrumPokerLogoWithText.png"}
                             opacityTransition={1}
                             id="homeScreenLogo"
                             alt="Scrum Poker Showdown Logo"/>
            </div>
            <FontAwesomeIcon icon={faSpinner} spin className="loadingSpin"/>
        </div>
    );
};

export default LoadingScreen;
