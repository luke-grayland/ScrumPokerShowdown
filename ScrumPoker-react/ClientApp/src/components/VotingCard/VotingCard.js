import React, {useContext} from "react";
import {UpdateGameModel} from "./VotingCardHelper";
import ClientIdContext from "../../contexts/ClientIdContext";
import GameContext from "../../contexts/GameContext";

const VotingCard = ({cardValue, setSelectedCard, selectedCard, showAverageResult}) => {
    const {clientIdContext} = useContext(ClientIdContext)
    
    const handleClick = () => {
        if (!showAverageResult) {
            setSelectedCard(cardValue)
            UpdateGameModel(cardValue, clientIdContext).then()
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