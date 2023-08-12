using Microsoft.AspNetCore.SignalR;
using ScrumPoker_react.Controllers;

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
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var clientId = Context.ConnectionId;
        var serviceProvider = Context.GetHttpContext()!.RequestServices;
        var gameController = serviceProvider.GetService<GameController>();
        gameController?.LeaveGame(clientId);
        
        await base.OnDisconnectedAsync(exception);
    }
}