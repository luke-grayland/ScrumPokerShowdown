using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using ScrumPoker_react.Models;
using ScrumPoker_react.Orchestrators;

namespace ScrumPoker_react.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly IGameOrchestrator _gameOrchestrator;
    private readonly IDistributedCache _cache;
    
    public HomeController(IGameOrchestrator gameOrchestrator, IDistributedCache cache)
    {
        _gameOrchestrator = gameOrchestrator;
        _cache = cache;
    }

    [HttpPost("StartGame")]
    public IActionResult StartGame([FromBody] NewGameModel playerGame)
    {
        try
        {
            if (playerGame == null)
                throw new NullReferenceException();

            var votingSystem = _gameOrchestrator.ValidateVotingSystem(playerGame);
            var player = _gameOrchestrator.CreatePlayer(playerGame.PlayerName, playerGame.ClientId, playerGame.PlayerMode);
            var groupId = _gameOrchestrator.CreateGroup(player.Id);
            var gameModel = _gameOrchestrator.AssembleGameModel(votingSystem, player, groupId);

            _cache.Set(groupId, Encoding.UTF8.GetBytes(JsonSerializer.Serialize(gameModel)));
            
            return Ok(JsonSerializer.Serialize(gameModel));
        }
        catch
        {
            return StatusCode(400, "Invalid custom voting system format");
        }
    }
}

