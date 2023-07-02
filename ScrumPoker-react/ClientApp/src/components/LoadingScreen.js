import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <FontAwesomeIcon icon={faSpinner} spin />
            <span>Loading...</span>
        </div>
    );
};

export default LoadingScreen;
