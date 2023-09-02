import {ValidatePlayerName} from "../HomeScreen/HomeScreenHelper";
import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {JoinGame} from "./JoinScreenHelper";
import ClientContext from "../../contexts/ClientContext";
import GameContext from "../../contexts/GameContext";

const JoinScreen = () => {
    const [playerName, setPlayerName] = useState("")
    const [playerNameErrorDisplayed, setPlayerNameErrorDisplayed] = useState(false)
    const [playerNameValidationResult, setPlayerNameValidationResult] = useState("")
    const [gameId, setGameId] = useState("")
    const navigate = useNavigate()
    const [serverErrorDisplayed, setServerErrorDisplayed] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const {clientContext} = useContext(ClientContext)
    const {updateGameContext} = useContext(GameContext)
    const location = useLocation();
    const { state } = location;
    const { serverError, serverErrorMessage } = state;

    useEffect(() => {
        setServerErrorDisplayed(false)
        setErrorMessage("")
    }, [serverError, serverErrorMessage])
    
    useEffect(() => {
        setServerErrorDisplayed(serverError)
        setErrorMessage(serverErrorMessage)
        setGameId("")
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
            navigate("/loading", {state: {fromHome: true}})
        }
    }

    return (
        <div>
            <div className="logoDiv">
                <img src={"/ScrumPokerLogoWithText.png"} alt="Scrum Poker Logo" id="homeScreenLogo" />
            </div>
            <div className="joinButtonDiv">
                <button className="btn btn-primary d-flex mx-auto buttonBlue"
                        onClick={() => navigate("/")}>
                    Home
                </button>
                <h5 className="text-center mt-2">Or</h5>
            </div>
            <div className="startScreen">
                <div className="startScreenContent shadowSmall card bg-light">
                    <form className="w-75 mt-4 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex flex-column">
                            <h3 className="text-center">Join a Game</h3>
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
                            <label className="form-label mx-auto text-center" htmlFor="gameId">Game ID</label>
                            <input
                                type="text"
                                id="gameId"
                                value={gameId}
                                name="gameId"
                                className="form-control m-2 text-center"
                                onChange={(e) => setGameId(e.target.value)}
                            />
                            <span className="invalid-danger text-danger text-center">
                                {serverErrorDisplayed ? errorMessage : ""}
                            </span>
                        </div>
                        <input id="startNewGameButton"
                               type="submit"
                               value="Join Game"
                               className="btn btn-primary d-flex mx-auto buttonBlue"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JoinScreen