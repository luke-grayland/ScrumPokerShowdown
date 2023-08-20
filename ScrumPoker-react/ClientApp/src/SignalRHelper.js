import React from 'react'
import * as signalR from '@microsoft/signalr'

export const GetSignalRConnection = () => {
    return new signalR.HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_SCRUM_POKER_HUB_URL)
        .build()
}