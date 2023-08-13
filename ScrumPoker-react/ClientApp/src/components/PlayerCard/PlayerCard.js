import React from 'react';

const PlayerCard = ({player, showScores}) => {
    return(
        <div className="playerCardAndName">
            <div className={`player scrumPokerCard card shadowSmall ${player.Vote > 0 
                ? "playerHasVoted" : ""} ${showScores ? "" 
                : "cardValueHidden"}`}>
                <h2>{ (showScores && player.Vote > 0) && player.Vote }</h2>
            </div>
            <h5 className="playerName">{player.Name}</h5>
        </div>
    )
}

export default PlayerCard