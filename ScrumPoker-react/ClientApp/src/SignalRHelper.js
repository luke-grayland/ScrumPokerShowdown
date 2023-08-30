import React from 'react'
import * as signalR from '@microsoft/signalr'

export const GetSignalRConnection = (localGroupId, localPlayerId) => {
    const query = `?groupId=${localGroupId}&playerId=${localPlayerId}`
    
    return new signalR.HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_SCRUM_POKER_HUB_URL + query)
        .withAutomaticReconnect()
        .build()
}

export const SignalRConnectionIdKey = "signalRConnectionId"