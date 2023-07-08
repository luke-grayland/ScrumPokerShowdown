import React, {useState} from "react";
import GameContext from "./GameContext";

const GameContextProvider = ({children}) => {
    const [gameContext, setGameContext] = useState()
    
    const updateGameContext = (updatedGameContext) => setGameContext(updatedGameContext)

    return (
        <GameContext.Provider value={{gameContext, updateGameContext}}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider