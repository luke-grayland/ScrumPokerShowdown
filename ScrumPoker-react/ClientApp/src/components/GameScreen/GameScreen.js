import React, {useContext, useEffect, useState} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";
import GameContext from '../../contexts/GameContext'
import NavBar from "../NavBar/NavBar";
import InviteWindow from "../InviteWindow/InviteWindow";
import {ResetPlayerVotes, ShowScores} from "./GameScreenHelper";
import VotingCardsRow from "./VotingCardsRow";
import ClientContext from "../../contexts/ClientContext";
import {useNavigate} from "react-router-dom";
import {StyledKofiButton} from "../KofiButton/KofiButton";
import {LocalGameContextKey, LocalPlayerIdKey, ConstPlayerMode} from "../../Constants";

const GameScreen = () => {
    const {gameContext, updateGameContext} = useContext(GameContext)
    const [players, setPlayers] = useState()
    const [votingCardsTopRow, setVotingCardsTopRow] = useState()
    const [votingCardsBottomRow, setVotingCardsBottomRow] = useState()
    const [showInviteWindow, setShowInviteWindow] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [averageResult, setAverageResult] = useState(0)
    const [showScores, setShowScores] = useState(false)
    const {clientContext} = useContext(ClientContext)
    const [groupId, setGroupId] = useState("")
    const [clientId, setClientId] = useState("")
    const navigate = useNavigate()
    const [spectatorMode, setSpectatorMode] = useState(false)

    window.onpopstate = () => navigate("/")
    
    if (clientContext)
    {
        clientContext.clientConnection.on("ReceiveUpdatedGameModel", data => updateGameContext(JSON.parse(data)))
        clientContext.clientConnection.on("ClearCardSelection", () => setSelectedCard(null))    
    }

    useEffect(() => {
        const localGameContext = window.localStorage.getItem(LocalGameContextKey)
        
        if(localGameContext !== null) {
            const parsedLocalGameContext = JSON.parse(localGameContext)
            updateGameContext({...parsedLocalGameContext})
        }
    }, [])
    
    useEffect(() => {
        if (players !== null && Array.isArray(players)) {
            const playerIsSpectator = players.find(x => x.Id === clientId)?.Mode === ConstPlayerMode.Spectator
            setSpectatorMode(playerIsSpectator)    
        }
    }, [players])
    
    useEffect(() => {
        if(clientContext?.clientId)
        {
            const clientId = clientContext.clientId 
            setClientId(clientId)
            window.localStorage.setItem(LocalPlayerIdKey, clientId)
        }
    }, [clientContext])
    
    useEffect(() => {
        if (gameContext === undefined)
            return
        
        setPlayers(gameContext.Players)
        setVotingCardsTopRow(gameContext.VotingCardsTopRow)
        setVotingCardsBottomRow(gameContext.VotingCardsBottomRow)
        setAverageResult(gameContext.AverageScore)
        setShowScores(gameContext.ScoresDisplayed)
        setGroupId(gameContext.GroupId)
        
        window.localStorage.setItem(LocalGameContextKey, JSON.stringify(gameContext))
    }, [gameContext])

    const toggleShowHideButton = () => showScores 
        ? ResetPlayerVotes(groupId).then() 
        : ShowScores(groupId).then()
    
    return (
        <>
            <NavBar showInviteWindow={showInviteWindow} 
                    setShowInviteWindow={setShowInviteWindow}
                    clientId={clientId}
                    groupId={groupId}
            />
            { showInviteWindow &&
                <InviteWindow setShowInviteWindow={setShowInviteWindow} groupIdProp={groupId}/>
            }
            <div className="results">
                <div id="resultsBoard" className="resultsBoard card shadowSmall bg-light">
                    <div className="average">
                        <h4>Average:</h4>
                        <h1 id="averageValue">
                            {(averageResult > 0 && showScores) ? averageResult.toString() : ""}
                        </h1>
                    </div>
                    <button id="showNewVoteButton" 
                            className="showHideButton btn btn-primary d-flex mx-auto buttonBlue" 
                            onClick={toggleShowHideButton}>
                        {showScores ? "New Vote" : "Show"}
                    </button>
                </div>
            </div>
            <div className="players">
                {players && players.map((player) => {
                        const shouldRenderPlayerCard = player.Mode === ConstPlayerMode.Player;

                        return shouldRenderPlayerCard ? (
                            <PlayerCard key={player.Id} player={player} showScores={showScores} />
                        ) : null;
                    })}
            </div>
            <div className="votingCards">
                <VotingCardsRow votingCardsRow={votingCardsTopRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showScores={showScores}
                                groupId={groupId}
                                spectatorMode={spectatorMode}/>
                {spectatorMode &&
                    <div className="spectatorModeTextContainer">
                        <h4 className="spectatorModeText">Spectator Mode</h4>
                    </div>
                }
                <VotingCardsRow votingCardsRow={votingCardsBottomRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showScores={showScores}
                                groupId={groupId}
                                spectatorMode={spectatorMode}/>
            </div>
            <StyledKofiButton/>
        </>
    );
};

export default GameScreen;
