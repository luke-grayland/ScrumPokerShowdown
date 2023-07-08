import React from "react";

const VotingCard = ({cardValue}) => {
    return(
        <div className="voting card shadowSmall cardHiddenValue">
            <h3>{cardValue}</h3>
        </div>
    )
}

export default VotingCard