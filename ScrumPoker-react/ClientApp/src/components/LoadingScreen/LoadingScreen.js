import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ImageFadeIn from "react-image-fade-in";

const LoadingScreen = () => {
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
