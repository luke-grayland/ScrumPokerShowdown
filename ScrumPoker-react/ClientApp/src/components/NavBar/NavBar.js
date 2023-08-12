import React from 'react'
import {useNavigate} from "react-router-dom";
const NavBar = ({ showInviteWindow, setShowInviteWindow }) => {
    const navigation = useNavigate()
    
    const handleHomeClick = () => navigation("/")
    const handleInviteWindowClick = () => setShowInviteWindow(!showInviteWindow)
    
    return(
        <div className="navBar">
            <button id="newGame" className="btn btn-primary d-flex mx-auto" onClick={handleHomeClick}>New Game</button>
            <img src="/LogoChipOnly.png" alt="Scrum Poker Logo" className="navBarLogo" />
            <button id="inviteButton" 
                    className="btn btn-primary d-flex mx-auto" 
                    onClick={handleInviteWindowClick}>Invite</button>
        </div>
    )
}

export default NavBar