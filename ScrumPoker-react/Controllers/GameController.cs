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
    private const string DbKey = "game-model-key";
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
            var gameModel = GetGameModel();
    
            var updatedGameModel = _gameOrchestrator.UpdatePlayerVote(
                gameModel, 
                updatePlayerVoteModel.CardValue, 
                updatePlayerVoteModel.PlayerId);
        
            SaveGameModel(updatedGameModel);
            
            _hub.Clients.All.SendAsync(
                "ReceiveUpdatedGameModel", 
                JsonSerializer.Serialize(updatedGameModel));
    
            return StatusCode(200, "Player vote updated");
        }
        catch
        {
            return StatusCode(400, "Could not update player vote");
        }
    }
    
    [HttpPost("ResetPlayerVotes")]
    public IActionResult ResetPlayerVotes()
    {
        try
        {
            var gameModel = GetGameModel();
            var updatedGameModel = _gameOrchestrator.ResetPlayerVotes(gameModel);
            
            SaveGameModel(updatedGameModel);
            
            _hub.Clients.All.SendAsync(
                "ReceiveUpdatedGameModel", 
                JsonSerializer.Serialize(updatedGameModel));
            
            return StatusCode(200, "Player votes reset");
        }
        catch
        {
            return StatusCode(400, "Could not reset player votes");
        }
    }

    private GameModel GetGameModel()
    {
        var serializedGameModel = _redis.GetDatabase().StringGet(DbKey);
        
        return JsonSerializer.Deserialize<GameModel>(serializedGameModel);
    }

    private void SaveGameModel(GameModel updatedGameModel)
    {
        _redis.GetDatabase().StringSet(DbKey, JsonSerializer.Serialize(updatedGameModel));
    }
}
