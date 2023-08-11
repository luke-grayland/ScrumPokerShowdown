import React, {useContext} from "react";
import {UpdateGameModel} from "./VotingCardHelper";
import ClientContext from "../../contexts/ClientContext";

const VotingCard = ({cardValue, setSelectedCard, selectedCard, showScores}) => {
    const {clientContext} = useContext(ClientContext)
    
    const handleClick = () => {
        if (!showScores) {
            setSelectedCard(cardValue)
            UpdateGameModel(cardValue, clientContext.clientId).then()
        }
    }
    
    return(
        <div className={`voting card shadowSmall cardHiddenValue ${selectedCard === cardValue ? 'selected' : ''}`} 
             onClick={handleClick}>
            <h3>{cardValue}</h3>
        </div>
    )
}

export default VotingCard