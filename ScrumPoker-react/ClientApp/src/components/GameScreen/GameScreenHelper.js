export const LocalGameContextKey = "localGameContext"
export const LocalPlayerIdKey = "localPlayerId"

export const ResetPlayerVotes = async(groupId) => {
    const url = process.env.REACT_APP_RESET_PLAYER_VOTES_URL;
    
    const data = {
        GroupId: groupId
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.text()
        console.log("Error: " + error)
    }
    else {
        return await response.text();
    }
}

export const ShowScores = async(groupId) => {
    const url = process.env.REACT_APP_SHOW_SCORES_URL;
    
    const data = {
        GroupId: groupId
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.text()
        console.log("Error: " + error)
    }
}
