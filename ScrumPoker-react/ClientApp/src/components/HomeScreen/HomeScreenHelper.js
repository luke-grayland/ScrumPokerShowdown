import {LocalGameContextKey, LocalPlayerIdKey} from "../GameScreen/GameScreenHelper";

export const startGame = async (playerName, clientId, votingSystem, customVotingSystem, updateGameContext, navigate) => {
    const url = process.env.REACT_APP_START_GAME_URL;

    const data = {
        playerName: playerName,
        clientId: clientId,
        votingSystem: votingSystem,
        customVotingSystem: customVotingSystem
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
            const errorMessage = await response.text()
            console.log(errorMessage)
            navigate("/")
            return
        }

        const gameModel = await response.json()
        updateGameContext(gameModel)

        setTimeout(() => {
            navigate("/game")
        }, 500)

    } catch (error) {
        console.error(error);
    }
};

export const ValidateCustomVotingSystem = (customVotingSystem) => {
    let result = ""
    let inputValues = customVotingSystem.split(",")
    
    if (customVotingSystem.slice(-1) === ",")
        result = "Custom values must not end with comma"
    
    if (inputValues.some(x => (parseInt(x) < 1 || parseInt(x) > 99)))
        result = "Custom values must be between 1 - 99"
    
    if (inputValues.some(x => isNaN(parseInt(x))))
        result = "Custom values must be numeric"

    if(inputValues.some((element, index) => {
        return inputValues.indexOf(element) !== index
    }))
        result = "Custom values must not contain duplicates"
    
    if (inputValues.length < 3)
        result = "A minimum of 3 values is required"

    if (inputValues.length > 16)
        result = "A maximum of 16 values is allowed"
    
    return result
}

export const ValidatePlayerName = (playerName) => {
    let result = ""
    
    if (playerName === "")
        result = "Player name cannot be empty"
    
    if (playerName.split("").length > 19)
        result = "Player name must be under 20 characters"
    
    return result
}

export const GetExistingGroupId = () => {
    let groupId = ""
    const localGameContext = JSON.parse(window.localStorage.getItem(LocalGameContextKey))
    
    if(localGameContext !== null)
        groupId = localGameContext?.GroupId !== null ? localGameContext.GroupId : ""
    
    return groupId
}

export const GetExistingPlayerId = () => {
    const localPlayerId = window.localStorage.getItem(LocalPlayerIdKey)
    return localPlayerId === null ? "" : localPlayerId 
}