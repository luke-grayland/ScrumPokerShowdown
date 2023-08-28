import React, {useContext, useEffect, useState} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";
import GameContext from '../../contexts/GameContext'
import NavBar from "../NavBar/NavBar";
import InviteWindow from "../InviteWindow/InviteWindow";
import {CheckHasValue, LocalGameContextKey, ResetPlayerVotes, ShowScores} from "./GameScreenHelper";
import VotingCardsRow from "./VotingCardsRow";
import ClientContext from "../../contexts/ClientContext";
import {SignalRConnectionIdKey} from "../../SignalRHelper";

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
    
    if (clientContext)
    {
        clientContext.clientConnection.on("ReceiveUpdatedGameModel", data => updateGameContext(JSON.parse(data)))
        clientContext.clientConnection.on("ClearCardSelection", () => setSelectedCard(null))    
    }

    useEffect(() => {
        const localGameContext = window.localStorage.getItem(LocalGameContextKey)
        if(localGameContext !== null)
        {
            const parsedLocalGameContext = JSON.parse(localGameContext)
            updateGameContext({ ...parsedLocalGameContext})
        }
    }, [])
    
    useEffect(() => {
        if(clientContext?.clientId)
            setClientId(clientContext.clientId)
    }, [clientContext])
    
    useEffect(() => {
        //does the null check on gamecontext need to happen?
        if (gameContext === null || gameContext === undefined)
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
                {players && players.map((player) => (
                    <PlayerCard key={player.Id} player={player} showScores={showScores}/>
                ))}
            </div>
            <div className="votingCards">
                <VotingCardsRow votingCardsRow={votingCardsTopRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showScores={showScores}
                                groupId={groupId}/>

                <VotingCardsRow votingCardsRow={votingCardsBottomRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showScores={showScores}
                                groupId={groupId}/>    
            </div>
        </>
    );
};

export default GameScreen;
