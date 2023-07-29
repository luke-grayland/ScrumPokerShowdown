import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const NavigateToGameScreenOnLoaded = (gameIsLoaded) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        setTimeout(() => {
            if (gameIsLoaded)
                navigate("/game")
        }, 800)
    }, [gameIsLoaded])
}