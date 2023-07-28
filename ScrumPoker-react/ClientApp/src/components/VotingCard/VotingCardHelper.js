export const UpdateGameModel = async (cardValue) => {
    const url = 'https://localhost:7050/Game/UpdatePlayerVote';

    const data = {
        CardValue: cardValue
    };

    try {
        console.log(JSON.stringify(data))
        
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
            const gameModel = await response.json();
            // console.log("Game Model Updated", gameModel)
            return gameModel
        }
    }
    catch (error) {
        console.error(error);
    }
}