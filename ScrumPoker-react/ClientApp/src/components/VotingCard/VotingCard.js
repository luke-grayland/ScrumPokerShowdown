import React, {useContext} from "react";
import {UpdateGameModel} from "./VotingCardHelper";
import ClientContext from "../../contexts/ClientContext";

const VotingCard = ({cardValue, setSelectedCard, selectedCard, showScores, groupId}) => {
    const {clientContext} = useContext(ClientContext)
    
    const handleClick = () => {
        if (!showScores) {
            setSelectedCard(cardValue)
            UpdateGameModel(cardValue, clientContext.clientId, groupId).then()
        }
    }
    
    return(
        <div className={`voting card bg-light shadowSmall cardHiddenValue ${selectedCard === cardValue ? 'selected' : ''}`} 
             onClick={handleClick}>
            <h3 className="text-center my-auto">{cardValue}</h3>
        </div>
    )
}

export default VotingCard