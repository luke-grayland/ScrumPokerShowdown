export const startGame = async (playerName, votingSystem, customVotingSystem, updateGameContext, navigate) => {
    const url = 'https://localhost:7050/Home/StartGame';

    const data = {
        playerName: playerName,
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
            console.log("Error: " + response)
        }

        const gameModel = await response.json();
        updateGameContext(gameModel)

        setTimeout(() => {
            navigate("/game")
        }, 500)

    } catch (error) {
        console.error(error);
    }
};