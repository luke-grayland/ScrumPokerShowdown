export const ResetPlayerVotes = async () => {
    const url = 'https://localhost:7050/Game/ResetPlayerVotes';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {}
    })

    if (!response.ok) {
        const error = await response.text()
        console.log("Error: " + error)
    }
    else {
        return await response.text();
    }
}