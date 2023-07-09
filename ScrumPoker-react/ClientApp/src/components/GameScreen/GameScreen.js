import React, {useContext, useState} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";
import VotingCard from "../VotingCard/VotingCard";
import GameContext from '../../contexts/GameContext'
import NavBar from "../NavBar/NavBar";
import InviteWindow from "../InviteWindow/InviteWindow";
import {UpdateGame} from "./GameScreenHelper";

const GameScreen = () => {
    const {gameContext} = useContext(GameContext)
    const [players, setPlayers] = useState(gameContext.Players)
    const [votingCardsTopRow, setVotingCardsTopRow] = useState(gameContext.VotingCardsTopRow)
    const [votingCardsBottomRow, setVotingCardsBottomRow] = useState(gameContext.VotingCardsBottomRow)
    const [showInviteWindow, setShowInviteWindow] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [averageResult, setAverageResult] = useState(0)
    const [showButtonVisible, setShowButtonVisible] = useState(true)
    
    UpdateGame(setPlayers, setVotingCardsTopRow, setVotingCardsBottomRow)

    const toggleShowHideButton = () => {
        if (showButtonVisible)
        {
            // show results
        }
        else {
            // start new vote
        }
        
        setShowButtonVisible(!showButtonVisible)
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
                        <h1 id="averageValue">{averageResult > 0 ? averageResult.toString() : ""}</h1>
                    </div>
                    <button id="showNewVoteButton" className="showHideButton" onClick={toggleShowHideButton}>
                        {showButtonVisible ? "Show" : "New Vote"}
                    </button>
                </div>
            </div>
            <div className="players">
                {players.map((player) => (
                    <PlayerCard key={player.Id} playerName={player.Name}/>
                ))}
            </div>
            <div className="votingCards">
                <div className="votingCardsRow">
                    {votingCardsTopRow.map((cardValue) => (
                        <VotingCard key={cardValue} 
                                    cardValue={cardValue} 
                                    setSelectedCard={setSelectedCard} 
                                    selectedCard={selectedCard}/>
                    ))}
                </div>
                <div className="votingCardsRow">
                    {votingCardsBottomRow.map((cardValue) => (
                        <VotingCard key={cardValue} 
                                    cardValue={cardValue} 
                                    setSelectedCard={setSelectedCard} 
                                    selectedCard={selectedCard}/>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GameScreen;
