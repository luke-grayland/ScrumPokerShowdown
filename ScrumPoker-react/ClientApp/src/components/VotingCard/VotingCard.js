import React, {useContext, useEffect} from "react";
import {UpdateGameModel} from "./VotingCardHelper";
import GameContext from "../../contexts/GameContext";

const VotingCard = ({cardValue, setSelectedCard, selectedCard}) => {
    
    const {gameContext, updateGameContext} = useContext(GameContext)
    
    const handleClick = () => {
        console.log("first", gameContext)
        setSelectedCard(cardValue)
        UpdateGameModel(cardValue).then(gameModel => {
            updateGameContext(gameModel)
        })
    }
    
    return(
        <div className={`voting card shadowSmall cardHiddenValue ${selectedCard === cardValue ? 'selected' : ''}`} 
             onClick={handleClick}>
            <h3>{cardValue}</h3>
        </div>
    )
}

export default VotingCard