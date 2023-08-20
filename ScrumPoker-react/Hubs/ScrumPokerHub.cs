using Microsoft.AspNetCore.SignalR;
using ScrumPoker_react.Controllers;

namespace ScrumPoker_react.Hubs;

public class ScrumPokerHub : Hub
{
    public async Task ClearCardSelection()
    {
        await Clients.All.SendAsync("ClearCardSelection");
    }
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var groupId = "test";
        var clientId = Context.ConnectionId;
        var serviceProvider = Context.GetHttpContext()!.RequestServices;
        var gameController = serviceProvider.GetService<GameController>();
        gameController?.LeaveGame(clientId, groupId);
        
        await base.OnDisconnectedAsync(exception);
    }
}