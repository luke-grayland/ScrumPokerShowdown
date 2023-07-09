import React from "react";
import {UpdateGameModel} from "./VotingCardHelper";

const VotingCard = ({cardValue, setSelectedCard, selectedCard}) => {
    
    const handleClick = () => {
        setSelectedCard(cardValue)
        
        // update game model via api
        
        UpdateGameModel(cardValue).then(r => console.log(r))
    }
    
    return(
        <div className={`voting card shadowSmall cardHiddenValue ${selectedCard === cardValue ? 'selected' : ''}`} 
             onClick={handleClick}>
            <h3>{cardValue}</h3>
        </div>
    )
}

export default VotingCard