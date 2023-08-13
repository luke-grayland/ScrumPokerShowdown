import React from 'react'
import {useNavigate} from "react-router-dom";
const NavBar = ({ showInviteWindow, setShowInviteWindow }) => {
    const navigation = useNavigate()
    
    const handleHomeClick = () => navigation("/")
    const handleInviteWindowClick = () => setShowInviteWindow(!showInviteWindow)
    
    return(
        <div className="d-flex shadowSmall bg-light">
            <button id="newGame" 
                    className="btn btn-primary d-flex mx-auto my-auto buttonBlue navBarButton" 
                    onClick={handleHomeClick}>New Game</button>
            <img src="/scrumPokerLogoOnly.png" alt="Scrum Poker Logo" className="navBarLogo" />
            <button id="inviteButton" 
                    className="btn btn-primary d-flex mx-auto my-auto buttonBlue navBarButton" 
                    onClick={handleInviteWindowClick}>Invite Players</button>
        </div>
    )
}

export default NavBar