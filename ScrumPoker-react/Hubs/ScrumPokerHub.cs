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
    
    public override async Task OnConnectedAsync()
    {
        var groupId = Context.GetHttpContext()!.Request.Query["groupId"].ToString();
        var oldPlayerId = Context.GetHttpContext()!.Request.Query["playerId"].ToString();

        if (groupId != "")
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);

        if (oldPlayerId != "")
        {
            var serviceProvider = Context.GetHttpContext()!.RequestServices;
            var gameController = serviceProvider.GetService<GameController>();
            gameController?.UpdatePlayerId(groupId, oldPlayerId, Context.ConnectionId);
        }

        await base.OnConnectedAsync();
    }
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        //TODO needs testing
        // var groupId = Context.GetHttpContext()!.Request.Query["groupId"].ToString();
        //
        // if (groupId != "")
        // {
        //     var clientId = Context.ConnectionId;
        //     var serviceProvider = Context.GetHttpContext()!.RequestServices;
        //     var gameController = serviceProvider.GetService<GameController>();
        //
        //     var leaveGameModel = new LeaveGameModel()
        //     {
        //         ClientId = clientId,
        //         GroupId = groupId
        //     };
        //
        //     gameController?.LeaveGame(leaveGameModel);    
        // }
        
        await base.OnDisconnectedAsync(exception);
    }
}