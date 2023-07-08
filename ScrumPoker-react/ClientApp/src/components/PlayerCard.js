import React from 'react';

const PlayerCard = ({playerName}) => {
    return(
        <div class="playerCardAndName">
            <div class="player card shadowSmall cardValueHidden">
                <h2></h2>
            </div>
            <h5 class="playerName">{playerName}</h5>
        </div>
    )
}

export default PlayerCard