export const JoinGame = async (playerName, clientId, gameId, navigate, updateGameContext) => {
    const url = 'https://localhost:7050/Game/JoinGame';

    const data = {
        playerName: playerName,
        clientId: clientId,
        gameId: gameId
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if (!response.ok) {
            console.log("Error: " + await response.json())
            return
        } 

        const gameModel = await response.json()
        updateGameContext(gameModel)
        
        setTimeout(() => {
            navigate("/game")
        }, 500)

    } catch (error) {
        
        navigate("/join", {state: {gameIdServerError: true}})
    }
}