import React from 'react'
import * as signalR from '@microsoft/signalr'

export const GetSignalRConnection = () => {
    return new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7050/ScrumPokerHub")
        .build()
}
