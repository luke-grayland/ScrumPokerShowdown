export const ResetPlayerVotes = async() => {
    const url = process.env.REACT_APP_RESET_PLAYER_VOTES_URL;

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

export const ShowScores = async() => {
    const url = process.env.REACT_APP_SHOW_SCORES_URL;

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
}