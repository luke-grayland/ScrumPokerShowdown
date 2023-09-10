using Microsoft.AspNetCore.SignalR;
using ScrumPoker_react.Controllers;
using ScrumPoker_react.Models;

namespace ScrumPoker_react.Hubs;

public class ScrumPokerHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var groupId = Context.GetHttpContext()!.Request.Query["groupId"].ToString();
        var playerName = Context.GetHttpContext()!.Request.Query["playerName"].ToString();
        var playerMode = Context.GetHttpContext()!.Request.Query["playerMode"].ToString();

        if (!new List<string>() { groupId, playerName, playerMode }.Any(string.IsNullOrEmpty))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            var serviceProvider = Context.GetHttpContext()!.RequestServices;
            var gameController = serviceProvider.GetService<GameController>();
            
            gameController?.ReAddPlayer(new ReAddPlayerModel()
            {
                GroupId = groupId,
                NewPlayerId = Context.ConnectionId,
                PlayerName = playerName,
                PlayerMode = playerMode
            });
        }

        await base.OnConnectedAsync();
    }
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var clientId = Context.ConnectionId;
        var groupId = Context.Items[Constants.ContextKeys.GroupId]?.ToString();

        if (!(string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(groupId)))
        {
            var serviceProvider = Context.GetHttpContext()!.RequestServices;
            var gameController = serviceProvider.GetService<GameController>();
         
            var leaveGameModel = new LeaveGameModel()
            {
                ClientId = clientId,
                GroupId = groupId
            };
         
            gameController?.LeaveGame(leaveGameModel);    
        }
        
        await base.OnDisconnectedAsync(exception);
    }
    
    public async Task ClearCardSelection()
    {
        await Clients.All.SendAsync("ClearCardSelection");
    }

    public void StoreGroupIdInHubContext(string groupId)
    {
        Context.Items[Constants.ContextKeys.GroupId] = groupId;
    }
}