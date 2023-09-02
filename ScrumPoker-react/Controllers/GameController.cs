using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ScrumPoker_react.Hubs;
using ScrumPoker_react.Models;
using ScrumPoker_react.Orchestrators;
using StackExchange.Redis;

namespace ScrumPoker_react.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IGameOrchestrator _gameOrchestrator;
    private readonly IHubContext<ScrumPokerHub> _hub;

    public GameController(
        IConnectionMultiplexer redis, 
        IGameOrchestrator gameOrchestrator, 
        IHubContext<ScrumPokerHub> hub)
    {
        _redis = redis;
        _gameOrchestrator = gameOrchestrator;
        _hub = hub;
    }
    
    [HttpPost("UpdatePlayerVote")]
    public IActionResult UpdatePlayerVote([FromBody] UpdatePlayerVoteModel updatePlayerVoteModel)
    {
        try
        {
            var gameModel = GetGameModel(updatePlayerVoteModel.GroupId);
    
            var updatedGameModel = _gameOrchestrator.UpdatePlayerVote(
                gameModel, 
                updatePlayerVoteModel.CardValue, 
                updatePlayerVoteModel.PlayerId);
        
            SaveGameModel(updatedGameModel, updatePlayerVoteModel.GroupId);
            SendGameModelToGroup(updatedGameModel, updatedGameModel.GroupId);
    
            return StatusCode(200, "Player vote updated");
        }
        catch
        {
            return StatusCode(400, "Could not update player vote");
        }
    }

    public void UpdatePlayerId(string groupId, string oldPlayerId, string newPlayerId)
    {
        var gameModel = GetGameModel(groupId);

        var updatedGameModel = _gameOrchestrator.UpdatePlayerId(gameModel, oldPlayerId, newPlayerId);
        
        SaveGameModel(updatedGameModel, groupId);
        SendGameModelToGroup(updatedGameModel, updatedGameModel.GroupId);
    }
    
    [HttpPost("ResetPlayerVotes")]
    public IActionResult ResetPlayerVotes([FromBody]ResetPlayerVotesModel resetPlayerVotesModel)
    {
        try
        {
            var gameModel = GetGameModel(resetPlayerVotesModel.GroupId);
            var updatedGameModel = _gameOrchestrator.ResetPlayerVotes(gameModel);
            
            SaveGameModel(updatedGameModel, resetPlayerVotesModel.GroupId);
            SendGameModelToGroup(updatedGameModel, updatedGameModel.GroupId);
            
            _hub.Clients.Group(resetPlayerVotesModel.GroupId).SendAsync("ClearCardSelection");
            
            return StatusCode(200, "Player votes reset");
        }
        catch
        {
            return StatusCode(400, "Could not reset player votes");
        }
    }
    
    [HttpPost("ShowScores")]
    public IActionResult ShowScores([FromBody]ShowScoresModel showScoresModel)
    {
        try
        {
            var gameModel = GetGameModel(showScoresModel.GroupId);
            var updatedGameModel = _gameOrchestrator.ShowScores(gameModel);
            
            SaveGameModel(updatedGameModel, showScoresModel.GroupId);
            SendGameModelToGroup(updatedGameModel, updatedGameModel.GroupId);

            return Ok();
        }
        catch
        {
            return StatusCode(400, "Could not show scores");
        }
    }
    
    [HttpPost("JoinGame")]
    public IActionResult JoinGame([FromBody] JoinGameModel joinGameModel)
    {
        try
        {
            if (joinGameModel == null || joinGameModel.GameId == string.Empty)
                throw new NullReferenceException();

            var player = _gameOrchestrator.CreatePlayer(joinGameModel.PlayerName, joinGameModel.ClientId);
            var groupId = ExtractGroupId(joinGameModel.GameId);
            var gameModel = GetGameModel(groupId);
            var updatedGameModel = _gameOrchestrator.AddPlayerToGame(gameModel, player, groupId);
            
            SaveGameModel(updatedGameModel, groupId);
            SendGameModelToGroup(updatedGameModel, updatedGameModel.GroupId);
            
            return Ok(JsonSerializer.Serialize(updatedGameModel));
        }
        catch (NullReferenceException)
        {
            return StatusCode(400, "Game ID invalid");
        }
        catch(Exception exception)
        {
            return StatusCode(400, exception.Message);
        }
    }
    
    [HttpPost("LeaveGame")]
    public IActionResult LeaveGame([FromBody] LeaveGameModel leaveGameModel)
    {
        var gameModel = GetGameModel(leaveGameModel.GroupId);
        var player = gameModel.Players.FirstOrDefault(x => x.Id == leaveGameModel.ClientId);
        var updatedGameModel = _gameOrchestrator.RemovePlayerFromGame(gameModel, player);

        SaveGameModel(updatedGameModel, leaveGameModel.GroupId);
        SendGameModelToGroup(updatedGameModel, updatedGameModel.GroupId);

        return Ok(JsonSerializer.Serialize(updatedGameModel));
    }

    private GameModel GetGameModel(string groupId)
    {
        var serializedGameModel = _redis.GetDatabase().StringGet(groupId);
        
        return JsonSerializer.Deserialize<GameModel>(serializedGameModel);
    }

    private void SaveGameModel(GameModel updatedGameModel, string groupId)
    {
        _redis.GetDatabase().StringSet(groupId, JsonSerializer.Serialize(updatedGameModel));
    }

    private void SendGameModelToGroup(GameModel updatedGameModel, string groupId)
    {
        _hub.Clients.Group(groupId).SendAsync(
            "ReceiveUpdatedGameModel",
            JsonSerializer.Serialize(updatedGameModel));
    }
    
    private static string ExtractGroupId(string gameId)
    {
        return gameId.Split("+")[1];
    }
}
