import {ValidatePlayerName} from "../HomeScreen/HomeScreenHelper";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {JoinGame} from "./JoinScreenHelper";
import ClientContext from "../../contexts/ClientContext";
import GameContext from "../../contexts/GameContext";

const JoinScreen = ({gameIdServerError}) => {
    const [playerName, setPlayerName] = useState("")
    const [playerNameErrorDisplayed, setPlayerNameErrorDisplayed] = useState(false)
    const [playerNameValidationResult, setPlayerNameValidationResult] = useState("")
    const [gameId, setGameId] = useState("")
    const navigate = useNavigate()
    const [gameIdErrorDisplayed, setGameIdErrorDisplayed] = useState(false)
    const {clientContext} = useContext(ClientContext)
    const {updateGameContext} = useContext(GameContext)
    
    useEffect(() => {
        setGameIdErrorDisplayed(gameIdServerError)
    }, [])
    
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

        if (gameValid) {
            JoinGame(playerName, clientContext.clientId, gameId, navigate, updateGameContext).then()
            navigate("/loading")
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
                        <span className="formErrorMessage">
                            {playerNameErrorDisplayed ? playerNameValidationResult : ""}
                        </span>
                        <label htmlFor="gameId">Game ID</label>
                        <input
                            type="text"
                            id="gameId"
                            name="gameId"
                            className="input formBorder"
                            onChange={(e) => setGameId(e.target.value)}
                        />
                        <span className="formErrorMessage">
                            {gameIdErrorDisplayed ? "Game ID invalid" : ""}
                        </span>
                        <input id="startNewGameButton"
                               type="submit"
                               value="Join Game"
                               className="submitButton scrumPokerButton"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JoinScreen
