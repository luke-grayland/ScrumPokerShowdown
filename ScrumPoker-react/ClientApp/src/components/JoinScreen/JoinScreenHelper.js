export const JoinGame = async (playerName, clientId, gameId, navigate, updateGameContext) => {
    const url = process.env.REACT_APP_JOIN_GAME;

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
            const errorMessage = await response.text()
            navigate("/join", {state: {serverError: true, serverErrorMessage: errorMessage}})
            return
        }

        const gameModel = await response.json()
        updateGameContext(gameModel)
        
        setTimeout(() => {
            navigate("/game")
        }, 500)

    } catch (error) {
        navigate("/join", {state: {serverError: true, serverErrorMessage: "Game ID invalid"}})
    }
}