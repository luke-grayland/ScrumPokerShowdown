import React, {useContext, useEffect, useState} from 'react';
import PlayerCard from "./PlayerCard";
import VotingCard from "./VotingCard";
import GameContext from '../contexts/GameContext'
import NavBar from "./NavBar";
import InviteWindow from "./InviteWindow";

const GameScreen = () => {
    const {gameContext, updateGameContext} = useContext(GameContext)
    const [players, setPlayers] = useState(gameContext.Players)
    const [votingCardsTopRow, setVotingCardsTopRow] = useState(gameContext.VotingCardsTopRow)
    const [votingCardsBottomRow, setVotingCardsBottomRow] = useState(gameContext.VotingCardsBottomRow)
    const [showInviteWindow, setShowInviteWindow] = useState(false)
    
    useEffect(() => {
        setPlayers(gameContext.Players)
        setVotingCardsTopRow(gameContext.VotingCardsTopRow)
        setVotingCardsBottomRow(gameContext.VotingCardsBottomRow)
        
        console.log("cheese" + players)
        
        //the problem is that this isn't triggering when the gameContext is updated via the updateGameContext call 
    }, [gameContext])
    
    
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
                        <h1 id="averageValue"></h1>
                    </div>
                    <button id="showNewVoteButton" className="showButton">Show</button>
                </div>
            </div>
            <div className="players">
                {players.map((player) => (
                    <PlayerCard key={player.Id} playerName={player.Name} />
                ))}
            </div>
            <div className="votingCards">
                <div className="votingCardsRow">
                    {votingCardsTopRow.map((cardValue) => (
                        <VotingCard key={cardValue} cardValue={cardValue} />
                    ))}
                </div>
                <div className="votingCardsRow">
                    {votingCardsBottomRow.map((cardValue) => (
                        <VotingCard key={cardValue} cardValue={cardValue} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default GameScreen;
