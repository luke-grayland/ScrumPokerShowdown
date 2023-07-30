﻿using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using ScrumPoker_react.Models;
using ScrumPoker_react.Orchestrators;
using StackExchange.Redis;

namespace ScrumPoker_react.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly IGameOrchestrator _gameOrchestrator;
    private readonly IConnectionMultiplexer _redis;
    private const string DbKey = "game-model-key";
    
    public HomeController(IConnectionMultiplexer redis, IGameOrchestrator gameOrchestrator)
    {
        _gameOrchestrator = gameOrchestrator;
        _redis = redis;
    }
    
    [HttpPost("StartGame")]
    public IActionResult StartGame([FromBody] NewGameModel playerGame)
    {
        try
        {
            if (playerGame == null)
                throw new NullReferenceException();

            var votingSystem = _gameOrchestrator.ValidateVotingSystem(playerGame);
            var player = _gameOrchestrator.CreatePlayer(playerGame.PlayerName, playerGame.ClientId);
            var gameModel = _gameOrchestrator.AssembleGameModel(votingSystem, player);
            
            _redis.GetDatabase().StringSet(DbKey, JsonSerializer.Serialize(gameModel));
            
            return Ok(JsonSerializer.Serialize(gameModel));
        }
        catch
        {
            return StatusCode(400, "Invalid custom voting system format");
        }
    }
    
}

