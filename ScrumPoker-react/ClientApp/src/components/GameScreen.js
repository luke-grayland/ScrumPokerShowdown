import React, {useEffect, useState} from 'react';
import PlayerCard from "./PlayerCard";
import VotingCard from "./VotingCard";

const GameScreen = () => {
    const temp = {
        "Players" : {
            "Player" : {
                "Name" : "Luke"
            }
        },
        "VotingSystem" : [1, 2, 3, 5, 8, 13],
        "VotingCardsTopRow" : [1, 2, 3],
        "VotingCardsBottomRow" : [5, 8, 13]
    }
    
    const [gameModel, setGameModel] = useState(temp)
    
    useEffect(() => {
        //fetch game model on page load
    }, [])
    
    return (
        <div>
            <div className="navBar">
                <button id="newGame" className="navButton">New Game</button>
                <img src="/LogoChipOnly.png" alt="Scrum Poker Logo" className="navBarLogo" />
                <button id="inviteButton" className="navButton inviteHidden">Invite</button>
            </div>
            <div id="inviteWindow" className="inviteWindow shadowSmall">
                <p id="inviteLink">Invite link</p>
            </div>
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
                {gameModel.Players.map((player) => (
                    <PlayerCard playerName={player.Name} />
                ))}
            </div>
            <div className="votingCards">
                <div className="votingCardsRow">
                    {gameModel.VotingCardsTopRow.map((cardValue) => (
                        <VotingCard cardValue={cardValue} />
                    ))}
                </div>
                <div className="votingCardsRow">
                    {gameModel.VotingCardsBottomRow.map((cardValue) => (
                        <VotingCard cardValue={cardValue} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
