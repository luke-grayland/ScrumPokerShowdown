import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import GameContext from "../../contexts/GameContext";
import {startGame, ValidateCustomVotingSystem, ValidatePlayerName} from "./HomeScreenHelper";
import ClientContext from "../../contexts/ClientContext";
const HomeScreen = () => {
    const [playerName, setPlayerName] = useState("")
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
            startGame(playerName, clientContext.clientId, votingSystem, customVotingSystem, updateGameContext, navigate)
                .then()
            navigate("/loading")
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

    return (
        <div>
            <div className="logoDiv">
                <img src={"/scrumPokerLogoWithText.png"} alt="Scrum Poker Logo" id="homeScreenLogo" />
            </div>
            <div className="joinButtonDiv">
                <button className="btn btn-primary d-flex mx-auto buttonBlue"
                        onClick={() => navigate("/join", {state: {gameIdServerError: false, errorMessage: ""}})}>
                    Join a Game
                </button>
                <h5 className="text-center mt-2">Or</h5>
            </div>
            <div className="startScreen">
                <div className="startScreenContent shadowSmall card bg-light">
                    <form className="w-75 mt-4 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex flex-column">
                            <h3 className="text-center">Start New Game</h3> 
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label className="form-label mx-auto text-center" htmlFor="playerName">Player Name</label>
                            <input
                                type="text"
                                id="playerName"
                                name="playerName"
                                className="form-control m-2 text-center"
                                onChange={(e) => setPlayerName(e.target.value)}
                            />
                            <span className="invalid-danger text-danger text-center">
                                {playerNameErrorDisplayed ? playerNameValidationResult : ""}
                            </span>
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label className="form-label mx-auto text-center" htmlFor="votingSystem">Voting System</label>
                            <select id="votingSystem"
                                name="votingSystem"
                                className="form-select text-center m-2"
                                onChange={handleVotingSystemChange}>
                                <option value="1, 2, 3, 5, 8, 13, 21, 34">1, 2, 3, 5, 8, 13, 21, 34</option>
                                <option value="1, 2, 3, 4, 5, 8, 13, 18, 21, 34">1, 2, 3, 4, 5, 8, 13, 18, 21, 34</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                        { displayCustomInput &&
                            <>
                                <div className="mb-3 d-flex flex-column">
                                    <label htmlFor="customVotingSystem" 
                                           className="form-label text-secondary text-center customVotingLabel">
                                        Please enter comma separated values
                                    </label>
                                    <input
                                        type="text"
                                        id="customVotingSystem"
                                        name="customVotingSystem"
                                        className="form-control text-center m-2"
                                        onChange={(e) =>
                                            setCustomVotingSystem(e.target.value)}/>
                                    <span className="invalid-danger text-danger text-center">
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
        </div>
    )
}

export default HomeScreen
