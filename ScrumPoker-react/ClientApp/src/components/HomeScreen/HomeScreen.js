import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import GameContext from "../../contexts/GameContext";
import {startGame, ValidateCustomVotingSystem, ValidatePlayerName} from "./HomeScreenHelper";
import ClientContext from "../../contexts/ClientContext";
import {StyledKofiButton} from "../KofiButton/KofiButton";
import {ConstPlayerMode, LocalGameContextKey, LocalPlayerKey} from "../../Constants";
const HomeScreen = () => {
    const [playerName, setPlayerName] = useState("")
    const [playerMode, setPlayerMode] = useState(ConstPlayerMode.Player)
    const [votingSystem, setVotingSystem] = useState("1, 2, 3, 5, 8, 13, 21, 34")
    const [customVotingSystem, setCustomVotingSystem] = useState("")
    const [displayCustomInput, setDisplayCustomInput] = useState(false)
    const [votingSystemErrorDisplayed, setVotingSystemErrorDisplayed] = useState(false)
    const [votingSystemValidationResult, setVotingSystemValidationResult] = useState("")
    const [playerNameErrorDisplayed, setPlayerNameErrorDisplayed] = useState(false)
    const [playerNameValidationResult, setPlayerNameValidationResult] = useState("")
    const navigate = useNavigate()
    const {updateGameContext} = useContext(GameContext)
    const {clientContext} = useContext(ClientContext)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let gameValid = true
        
        let nameValidationResult = ValidatePlayerName(playerName)
        if(nameValidationResult !== "")
        {
            setPlayerNameValidationResult(nameValidationResult)
            setPlayerNameErrorDisplayed(true)
            gameValid = false
        } else {
            setPlayerNameErrorDisplayed(false)
        }
        
        if (displayCustomInput) {
            let votingValidationResult = ValidateCustomVotingSystem(customVotingSystem)

            if (votingValidationResult !== "") {
                setVotingSystemValidationResult(votingValidationResult);
                setVotingSystemErrorDisplayed(true)
                gameValid = false
            } else {
                setVotingSystemErrorDisplayed(false)
            }
        }
        
        if (gameValid) {
            startGame(playerName, clientContext.clientId, votingSystem, customVotingSystem, 
                updateGameContext, navigate, playerMode).then()
            
            navigate("/loading", {state: {fromHome: true}})
        }
    }

    const handleVotingSystemChange = (e) => {
        let newVotingSystem = e.target.value
        setVotingSystem(newVotingSystem)
        
        if (newVotingSystem === "Custom")
        {
            setDisplayCustomInput(true)
            setVotingSystemErrorDisplayed(false)
        } else {
            setDisplayCustomInput(false)    
        }
    }
    
    useEffect(() => {
        window.localStorage.removeItem(LocalPlayerKey)
        window.localStorage.removeItem(LocalGameContextKey)
    }, [])
    
    const handlePlayerModeChange = (e) => setPlayerMode(e.target.value)

    return (
        <div className="scrollable">
            <div className="logoDiv">
                <img src={"/scrumPokerLogoWithText.png"} alt="Scrum Poker Logo" id="homeScreenLogo" />
            </div>
            <div className="startScreen">
                <div className="startScreenContent shadowSmall card bg-light">
                    <form className="w-75 mt-4 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-2 d-flex flex-column">
                            <h3 className="text-center">Start New Game</h3> 
                        </div>
                        <div className="mb-2 d-flex flex-column">
                            <label className="form-label mx-auto text-center form-padding-left-small" 
                                   htmlFor="playerName">Player Name</label>
                            <input
                                type="text"
                                id="playerName"
                                name="playerName"
                                className="form-control m-2 text-center"
                                onChange={(e) => setPlayerName(e.target.value)}
                            />
                            <span className="invalid-danger text-danger text-center form-padding-left-small">
                                {playerNameErrorDisplayed ? playerNameValidationResult : ""}
                            </span>
                        </div>
                        <div className="mb-2 d-flex flex-column">
                            <label className="form-label mx-auto text-center form-padding-left-small" 
                                   htmlFor="playerMode">I'm a</label>
                            <select id="playerMode"
                                    name="playerMode"
                                    className="form-select text-center m-2 form-select-padding"
                                    onChange={handlePlayerModeChange}>
                                <option value={ConstPlayerMode.Player}>{ConstPlayerMode.Player}</option>
                                <option value={ConstPlayerMode.Spectator}>{ConstPlayerMode.Spectator}</option>
                            </select>
                        </div>
                        <div className="mb-2 d-flex flex-column">
                            <label className="form-label mx-auto text-center form-padding-left-small" 
                                   htmlFor="votingSystem">Voting System</label>
                            <select id="votingSystem"
                                name="votingSystem"
                                className="form-select text-center m-2 form-select-padding"
                                onChange={handleVotingSystemChange}>
                                <option value="1, 2, 3, 5, 8, 13, 21, 34">1, 2, 3, 5, 8, 13, 21, 34</option>
                                <option value="1, 2, 3, 4, 5, 8, 13, 18, 21, 34">1, 2, 3, 4, 5, 8, 13, 18, 21, 34</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                        { displayCustomInput &&
                            <>
                                <div className="mb-2 d-flex flex-column">
                                    <label htmlFor="customVotingSystem" 
                                           className="form-label text-secondary text-center customVotingLabel form-padding-left-small">
                                        Please enter comma separated values
                                    </label>
                                    <input
                                        type="text"
                                        id="customVotingSystem"
                                        name="customVotingSystem"
                                        className="form-control text-center m-2"
                                        onChange={(e) =>
                                            setCustomVotingSystem(e.target.value)}/>
                                    <span className="invalid-danger text-danger text-center form-padding-left-small">
                                        {votingSystemErrorDisplayed ? votingSystemValidationResult : ""}
                                    </span>
                                </div>
                            </>
                        }
                        <input id="startNewGameButton" 
                               type="submit" 
                               value="Start Game" 
                               className="btn btn-primary d-flex mx-auto buttonBlue"/>
                    </form>
                </div>
            </div>
            <StyledKofiButton/>
        </div>
    )
}

export default HomeScreen