import React from 'react'
import * as signalR from '@microsoft/signalr'

export const GetSignalRConnection = (localGroupId, localPlayer) => {
    const query = `?groupId=${localGroupId}&playerName=${localPlayer.Name}&playerMode=${localPlayer.Mode}`

    return new signalR.HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_SCRUM_POKER_HUB_URL + query)
        .withAutomaticReconnect()
        .build()
}

export const SignalRConnectionIdKey = "signalRConnectionId"