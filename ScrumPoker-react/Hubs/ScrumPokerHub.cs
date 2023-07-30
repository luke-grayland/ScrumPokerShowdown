using Microsoft.AspNetCore.SignalR;

namespace ScrumPoker_react.Hubs;

public class ScrumPokerHub : Hub
{
    public async Task UpdateGameModel(string updatedGameModel)
    {
        await Clients.All.SendAsync("ReceiveUpdatedGameModel", updatedGameModel);
    }
}