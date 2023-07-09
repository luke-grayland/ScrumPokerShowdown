import React from 'react';

const PlayerCard = ({playerName}) => {
    return(
        <div className="playerCardAndName">
            <div className="player card shadowSmall cardValueHidden">
                <h2></h2>
            </div>
            <h5 className="playerName">{playerName}</h5>
        </div>
    )
}

export default PlayerCard