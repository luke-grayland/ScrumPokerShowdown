import React, {useContext, useEffect, useState} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";
import GameContext from '../../contexts/GameContext'
import NavBar from "../NavBar/NavBar";
import InviteWindow from "../InviteWindow/InviteWindow";
import {ResetPlayerVotes} from "./GameScreenHelper";
import VotingCardsRow from "./VotingCardsRow";
import ClientContext from "../../contexts/ClientContext";

const GameScreen = () => {
    const {gameContext, updateGameContext} = useContext(GameContext)
    const [players, setPlayers] = useState(gameContext.Players)
    const [votingCardsTopRow, setVotingCardsTopRow] = useState(gameContext.VotingCardsTopRow)
    const [votingCardsBottomRow, setVotingCardsBottomRow] = useState(gameContext.VotingCardsBottomRow)
    const [showInviteWindow, setShowInviteWindow] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [averageResult, setAverageResult] = useState(0)
    const [showAverageResult, setShowAverageResult] = useState(false)
    const {clientContext} = useContext(ClientContext)

    clientContext.clientConnection.on("ReceiveUpdatedGameModel", (data) => {
        updateGameContext(JSON.parse(data))
    })
    
    useEffect(() => {
        setPlayers(gameContext.Players)
        setVotingCardsTopRow(gameContext.VotingCardsTopRow)
        setVotingCardsBottomRow(gameContext.VotingCardsBottomRow)
        setAverageResult(gameContext.AverageScore)
    }, [gameContext])
    
    const toggleShowHideButton = () => {
        if (showAverageResult) {
            ResetPlayerVotes().then()
            setSelectedCard(null)
        }
        
        setShowAverageResult(!showAverageResult)
    }
    
    return (
        <>
            <NavBar showInviteWindow={showInviteWindow} setShowInviteWindow={setShowInviteWindow}/>
            { showInviteWindow &&
                <InviteWindow/>
            }
            <div className="results">
                <div id="resultsBoard" className="resultsBoard shadowSmall">
                    <div className="average">
                        <h4>Average:</h4>
                        <h1 id="averageValue">
                            {(averageResult > 0 && showAverageResult) ? averageResult.toString() : ""}
                        </h1>
                    </div>
                    <button id="showNewVoteButton" className="showHideButton scrumPokerButton" onClick={toggleShowHideButton}>
                        {showAverageResult ? "New Vote" : "Show"}
                    </button>
                </div>
            </div>
            <div className="players">
                {players.map((player) => (
                    <PlayerCard key={player.Id} player={player} showAverageResult={showAverageResult}/>
                ))}
            </div>
            <div className="votingCards">
                <VotingCardsRow votingCardsRow={votingCardsTopRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showAverageResult={showAverageResult}/>

                <VotingCardsRow votingCardsRow={votingCardsBottomRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showAverageResult={showAverageResult}/>    
            </div>
        </>
    );
};

export default GameScreen;
