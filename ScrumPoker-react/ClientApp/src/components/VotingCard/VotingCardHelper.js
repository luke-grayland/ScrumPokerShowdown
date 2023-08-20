export const UpdateGameModel = async (cardValue, playerId, groupId) => {
    const url = process.env.REACT_APP_UPDATE_PLAYER_VOTE_URL;

    const data = {
        CardValue: cardValue,
        PlayerId: playerId,
        GroupId: groupId
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.text()
        console.log("Error: " + error)
    }
}