export const UpdateGameModel = async (cardValue, playerId) => {
    const url = 'https://localhost:7050/Game/UpdatePlayerVote';

    const data = {
        CardValue: cardValue,
        PlayerId: playerId
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json()
        console.log("Error: " + error)
    }
    else {
        return response
    }
}