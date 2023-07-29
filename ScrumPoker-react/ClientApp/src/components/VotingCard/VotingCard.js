import React, {useContext} from "react";
import {UpdateGameModel} from "./VotingCardHelper";
import GameContext from "../../contexts/GameContext";

const VotingCard = ({cardValue, setSelectedCard, selectedCard, showAverageResult}) => {
    const {updateGameContext} = useContext(GameContext)
    
    const handleClick = () => {
        if (!showAverageResult) {
            setSelectedCard(cardValue)
            UpdateGameModel(cardValue).then(gameModel => updateGameContext(gameModel))
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