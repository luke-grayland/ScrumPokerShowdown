import React from 'react';

const PlayerCard = ({player, showAverageResult}) => {
    return(
        <div className="playerCardAndName">
            <div className={`player card shadowSmall ${player.Vote > 0 ? "playerHasVoted" : ""} ${showAverageResult ? "" : "cardValueHidden"}`}>
                <h2> { (showAverageResult && player.Vote > 0) && player.Vote }
                </h2>
            </div>
            <h5 className="playerName">{player.Name}</h5>
        </div>
    )
}

export default PlayerCard