import {ValidatePlayerName} from "../HomeScreen/HomeScreenHelper";
import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import ClientContext from "../../contexts/ClientContext";
import GameContext from "../../contexts/GameContext";
import {ConstPlayerMode, GameIdQueryParameterText, LocalGameContextKey, LocalPlayerKey} from "../../Constants";
import {JoinGame} from "./JoinScreenHelper";

const JoinScreen = () => {
    const [playerName, setPlayerName] = useState("")
    const [playerNameErrorDisplayed, setPlayerNameErrorDisplayed] = useState(false)
    const [playerNameValidationResult, setPlayerNameValidationResult] = useState("")
    const [playerMode, setPlayerMode] = useState(ConstPlayerMode.Player )
    const [gameId, setGameId] = useState("")
    const navigate = useNavigate()
    const {clientContext} = useContext(ClientContext)
    const {updateGameContext} = useContext(GameContext)
    const [searchParams] = useSearchParams();
    const [gameIdErrorDisplayed, setGameIdErrorDisplayed] = useState(false)
    const [gameIdErrorMessage, setGameIdErrorMessage] = useState(false)
    const location = useLocation()
    
    useEffect(() => {
        window.localStorage.removeItem(LocalPlayerKey)
        window.localStorage.removeItem(LocalGameContextKey)
        
        setGameId(searchParams.get(GameIdQueryParameterText))
        setGameIdErrorDisplayed(location.state?.serverError)
        setGameIdErrorMessage(location.state?.serverErrorMessage)
    }, [])

    const handlePlayerModeChange = (e) => setPlayerMode(e.target.value)
    
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
            JoinGame(playerName, playerMode, clientContext.clientId, gameId, navigate, updateGameContext).then()
            navigate("/loading", {state: {fromHome: true}})
        }
    }

    return (
        <div>
            <div className="logoDiv">
                <img src={"/ScrumPokerLogoWithText.png"} alt="Scrum Poker Logo" id="homeScreenLogo" />
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
                        <div className="mb-3 d-flex flex-column">
                            <label className="form-label mx-auto text-center" htmlFor="gameId">Game ID</label>
                            <input
                                type="text"
                                id="gameId"
                                value={gameId ?? ""}
                                name="gameId"
                                className="form-control m-2 text-center"
                                readOnly
                            />
                            <span className="invalid-danger text-danger text-center">
                                {gameIdErrorDisplayed ? gameIdErrorMessage : ""}
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