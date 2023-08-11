using Microsoft.AspNetCore.SignalR;

namespace ScrumPoker_react.Hubs;

public class ScrumPokerHub : Hub
{
    public async Task UpdateGameModel(string updatedGameModel)
    {
        await Clients.All.SendAsync("ReceiveUpdatedGameModel", updatedGameModel);
    }

    public async Task ClearCardSelection()
    {
        await Clients.All.SendAsync("ClearCardSelection");
    }
}