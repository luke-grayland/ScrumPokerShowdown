using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
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
    
    public GameController(IConnectionMultiplexer redis, IGameOrchestrator gameOrchestrator)
    {
        _redis = redis;
        _gameOrchestrator = gameOrchestrator;
    }
    
    [HttpPost("UpdatePlayerVote")]
    public IActionResult UpdatePlayerVote([FromBody] UpdatePlayerVoteModel updatePlayerVoteModel)
    {
        try
        {
            var gameModel = GetGameModel();
            var playerId = gameModel.Players.FirstOrDefault().Id; // remember to change this, need to find the current player

            var updatedGameModel = _gameOrchestrator.UpdatePlayerVote(
                gameModel, 
                updatePlayerVoteModel.CardValue, 
                playerId);
        
            SaveGameModel(updatedGameModel);
            return Ok(JsonSerializer.Serialize(updatedGameModel));    
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
            return Ok(JsonSerializer.Serialize(updatedGameModel));
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
