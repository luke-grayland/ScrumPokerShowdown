export const NavigateToNewGame = async (navigation, clientId, groupId) => {
    navigation("/")

    const url = process.env.REACT_APP_LEAVE_GAME_URL;

    const data = {
        ClientId: clientId,
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