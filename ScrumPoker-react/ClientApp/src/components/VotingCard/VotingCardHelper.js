import GameContext from "../../contexts/GameContext";
import {useContext} from "react";

export const UpdateGameModel = async (cardValue) => {
    // const {updateGameContext} = useContext(GameContext)
    
    const url = 'https://localhost:7050/Game/UpdatePlayerVote';

    const data = {
        cardValue: cardValue
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.log("Error: " + response)
        }

        const gameModel = await response.json();
        // updateGameContext(gameModel)
        console.log(gameModel)
    }
    catch (error) {
        console.error(error);
    }
}