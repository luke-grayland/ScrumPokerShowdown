using Microsoft.AspNetCore.SignalR;
using ScrumPoker_react.Controllers;
using ScrumPoker_react.Models;

namespace ScrumPoker_react.Hubs;

public class ScrumPokerHub : Hub
{
    public async Task ClearCardSelection()
    {
        await Clients.All.SendAsync("ClearCardSelection");
    }
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        //Still needs to be implemented following Signal R groups updates.
        //Group ID needs to be found from somewhere in order for this to work.
        var groupId = "test";
        var clientId = Context.ConnectionId;
        var serviceProvider = Context.GetHttpContext()!.RequestServices;
        var gameController = serviceProvider.GetService<GameController>();

        var leaveGameModel = new LeaveGameModel()
        {
            ClientId = clientId,
            GroupId = groupId
        };
        
        gameController?.LeaveGame(leaveGameModel);
        
        await base.OnDisconnectedAsync(exception);
    }
}