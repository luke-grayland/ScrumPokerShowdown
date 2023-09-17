import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import GameContext from "../../contexts/GameContext";
import {
    executeScroll,
    FetchInfoCardText,
    startGame,
    ValidateCustomVotingSystem,
    ValidatePlayerName
} from "./HomeScreenHelper";
import ClientContext from "../../contexts/ClientContext";
import {StyledKofiButton} from "../KofiButton/KofiButton";
import {ConstPlayerMode, LocalGameContextKey, LocalPlayerKey} from "../../Constants";
import InfoCard from "./InfoCard";
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
    const [whatCardText, setWhatCardText] = useState("")
    const [whyCardText, setWhyCardText] = useState("")
    const [howCardText, setHowCardText] = useState("")
    const [customNumbersCardText, setCustomNumbersCardText] = useState("")
    const [successCardText, setSuccessCardText] = useState("")
    const infoCardsRef = useRef(null)
    
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
        FetchInfoCardText(setWhyCardText, setWhatCardText, setHowCardText, setCustomNumbersCardText, setSuccessCardText)
    }, [])
    
    const handlePlayerModeChange = (e) => setPlayerMode(e.target.value)
    const handleExecuteScroll = () => executeScroll(infoCardsRef)

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
                <div className="infoCardContainer">
                    <div className="learnMoreContainer" ref={infoCardsRef}>
                        <div className="learnMoreInnerContainer" onClick={handleExecuteScroll}>
                            <h5 className="my-auto text-center text-muted mx-1">Learn more</h5>
                            <img src={"/down_arrow.png"} alt="Down arrow" className="downArrow my-auto" />
                        </div>
                    </div>
                    <div id="infoCardsContainer" className="infoCardsContainer card" >
                        <h3 className="text-center my-4">FAQs</h3>
                        <InfoCard title={"What is Scrum Poker?"} bodyText={whatCardText}/>
                        <InfoCard title={"Can I use custom numbers?"} bodyText={customNumbersCardText}/>
                        <InfoCard title={"How is Scrum Poker played?"} bodyText={howCardText}/>
                        <InfoCard title={"Why use Scrum Poker Showdown?"} bodyText={whyCardText}/>
                        <InfoCard title={"How does Scrum Poker promote effective planning?"} bodyText={successCardText} footer={"Happy Estimating!"}/>
                    </div>
                </div>
                <h6 className="text-center pb-3 text-muted">© LazyGrayLabs 2023</h6>
            </div>
            <StyledKofiButton/>
        </div>
    )
}

export default HomeScreen