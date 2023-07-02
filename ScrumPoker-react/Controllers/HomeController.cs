using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using ScrumPoker_react.Models;
using ScrumPoker_react.Orchestrators;

namespace ScrumPoker_react.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly IGameOrchestrator _gameOrchestrator;
    
    public HomeController(IGameOrchestrator gameOrchestrator)
    {
        _gameOrchestrator = gameOrchestrator;
    }
    
    [HttpPost("StartGame")]
    public IActionResult StartGame([FromBody] NewGameModel playerGame)
    {
        try
        {
            if (playerGame == null)
                throw new NullReferenceException();

            var votingSystem = _gameOrchestrator.ValidateVotingSystem(playerGame);
            var player = _gameOrchestrator.CreatePlayer(playerGame.PlayerName);
            var gameModel = _gameOrchestrator.AssembleGameModel(votingSystem, player);

            return Ok(JsonSerializer.Serialize(gameModel));
        }
        catch
        {
            return StatusCode(400, "Invalid custom voting system format");
        }
    }
    
}

