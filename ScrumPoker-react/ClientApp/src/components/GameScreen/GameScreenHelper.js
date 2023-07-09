import {useContext, useEffect} from "react";
import GameContext from "../../contexts/GameContext";

export const UpdateGame = (setPlayers, setVotingCardsTopRow, setVotingCardsBottomRow) => {
    const {gameContext} = useContext(GameContext)
    
    useEffect(() => {
        setPlayers(gameContext.Players)
        setVotingCardsTopRow(gameContext.VotingCardsTopRow)
        setVotingCardsBottomRow(gameContext.VotingCardsBottomRow)

        //the problem is that this isn't triggering when the gameContext is updated via the updateGameContext call 
    }, [gameContext])
}