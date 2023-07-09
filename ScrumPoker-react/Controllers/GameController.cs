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
    public IActionResult UpdatePlayerVote([FromBody] int cardValue)
    {
        try
        {
            var serializedGameModel = _redis.GetDatabase().StringGet(DbKey);
            var gameModel = JsonSerializer.Deserialize<GameModel>(serializedGameModel);
            
            var playerId = new Guid(); // remember to change this

            var updatedGameModel = _gameOrchestrator.UpdatePlayerVote(gameModel, cardValue, playerId);
        
            _redis.GetDatabase().StringSet(DbKey, JsonSerializer.Serialize(updatedGameModel));

            return Ok(JsonSerializer.Serialize(updatedGameModel));    
        }
        catch
        {
            return StatusCode(400, "Could not update player vote");
        }
    }
}