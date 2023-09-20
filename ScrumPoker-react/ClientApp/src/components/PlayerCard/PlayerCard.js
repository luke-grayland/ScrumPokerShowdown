import React, {useEffect, useState} from 'react';

const PlayerCard = ({player, showScores}) => {
    const [playerHasVoted, setPlayerHasVoted] = useState(false)
    
    useEffect(() => {
        if(player.Vote)
            setPlayerHasVoted(player.Vote > 0)
    }, [player])
    
    useEffect(() => {
        if (!showScores)
            setPlayerHasVoted(false)
    }, [showScores])
    
    return(
        <div className="playerCardAndName">
            <div className={`player scrumPokerCard card shadowSmall ${playerHasVoted 
                ? "playerHasVoted" : ""} ${showScores ? "" : "cardValueHidden"}`}>
                { (playerHasVoted && !showScores) &&
                    <img src="/cardTick.png" alt="Player Has Voted Tick" className="playerHasVotedTick" />    
                }
                <h2>{ (showScores && player.Vote > 0) && player.Vote }</h2>
            </div>
            <h5 className="playerName">{player.Name}</h5>
        </div>
    )
}

export default PlayerCard