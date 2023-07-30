import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import GameContext from "../../contexts/GameContext";
import {startGame, ValidateCustomVotingSystem} from "./HomeScreenHelper";
import ClientIdContext from "../../contexts/ClientIdContext";
const HomeScreen = () => {
    const [playerName, setPlayerName] = useState("")
    const [votingSystem, setVotingSystem] = useState("1, 2, 3, 5, 8, 13, 21, 34")
    const [customVotingSystem, setCustomVotingSystem] = useState("")
    const [displayCustomInput, setDisplayCustomInput] = useState(false)
    const [errorDisplayed, setErrorDisplayed] = useState(false)
    const [validationResult, setValidationResult] = useState("")
    const navigate = useNavigate()
    const {updateGameContext} = useContext(GameContext)
    const {clientIdContext} = useContext(ClientIdContext)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (displayCustomInput) {
            let result = ValidateCustomVotingSystem(customVotingSystem)

            if (result !== "") {
                setValidationResult(result);
                setErrorDisplayed(true)
            } else {
                startGame(playerName, clientIdContext, votingSystem, customVotingSystem, updateGameContext, navigate)
                    .then()
                navigate("/loading")
            }
        } else {
            startGame(playerName, clientIdContext, votingSystem, customVotingSystem, updateGameContext, navigate).then()
            navigate("/loading")
        }
    }
    
    const handleVotingSystemChange = (e) => {
        setVotingSystem(e.target.value)
        
        if (votingSystem !== "Custom")
        {
            setDisplayCustomInput(true)
            setErrorDisplayed(false)
        } else {
            setDisplayCustomInput(false)    
        }
    }

    return (
        <div>
            <div className="logoDiv">
                <img src={"/ScrumPokerShowdownLogo.png"} alt="Scrum Poker Logo" id="homeScreenLogo" />
            </div>
            <div className="startScreen">
                <div className="startScreenContent shadowSmall">
                    <form className="startScreenForm" onSubmit={handleSubmit}>
                        <label htmlFor="playerName">Player Name</label>
                        <input
                            type="text"
                            id="playerName"
                            name="playerName"
                            className="input formBorder"
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                        <label htmlFor="votingSystem">Voting System</label>
                        <select
                            id="votingSystem"
                            name="votingSystem"
                            className="input formBorder"
                            onChange={handleVotingSystemChange}>
                            <option value="1, 2, 3, 5, 8, 13, 21, 34">1, 2, 3, 5, 8, 13, 21, 34</option>
                            <option value="Custom">Custom</option>
                        </select>
                        { displayCustomInput &&
                            <>
                                <label htmlFor="customVotingSystem" className="customInputLabel">
                                    Please enter comma separated values
                                </label>
                                <input
                                    type="text"
                                    id="customVotingSystem"
                                    name="customVotingSystem"
                                    className="input formBorder"
                                    onChange={(e) => 
                                        setCustomVotingSystem(e.target.value)}
                                />
                                <span className="customVotingSystemErrorMessage">{errorDisplayed ? validationResult : ""}</span>
                            </>
                        }
                        <input type="submit" value="Start" className="submitButton"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen
