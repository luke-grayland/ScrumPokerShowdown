using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using ScrumPoker_react.Models;

namespace ScrumPoker_react.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    public HomeController()
    {
        
    }
    
    [HttpPost("StartGame")]
    public IActionResult StartGame([FromBody] string playerGame)
    {
        var playerGameModel = JsonSerializer.Deserialize<PlayerGameModel>(playerGame);
        
        // if (playerGameViewModel.VotingSystem == null ||
        //     playerGameViewModel.PlayerName == null)
        //     throw new NullReferenceException();
        //
        // var votingCardValues =
        //     _gameHelper.FormatVotingCardValues(playerGameViewModel.VotingSystem);
        //
        // var playerName =
        //     _gameHelper.SanitiseValidateName(playerGameViewModel.PlayerName);
        //
        // var gameConfig = new RouteValueDictionary()
        // {
        //     {"votingCardValues", votingCardValues},
        //     {"playerName", playerName}
        // };
        //
        // return RedirectToAction("InitialiseGame", "Game", gameConfig);

        return Ok();
    }
}

