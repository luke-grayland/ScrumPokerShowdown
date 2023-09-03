using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;
using ScrumPoker_react.Hubs;
using ScrumPoker_react.Models;

namespace ScrumPoker_react.Orchestrators;

public class GameOrchestrator : IGameOrchestrator
{
    private readonly IHubContext<ScrumPokerHub> _hub;
    
    public GameOrchestrator(IHubContext<ScrumPokerHub> hub)
    {
        _hub = hub;
    }
    public List<int> ValidateVotingSystem(NewGameModel newGameModel)
    {
        var votingSystem = newGameModel.VotingSystem == "Custom"
            ? newGameModel.CustomVotingSystem
            : newGameModel.VotingSystem;

        try
        {
            return votingSystem.Split(",").Select(int.Parse).OrderBy(x => x).ToList();
        }
        catch
        {
            throw new Exception("Custom voting system incorrectly formatted");
        }
    }

    public GameModel AssembleGameModel(IList<int> votingSystem, PlayerModel player, string groupId)
    {
        var votingCardRows = SplitCardsToRows(votingSystem);
        
        return new GameModel()
        {
            Players = new List<PlayerModel>() { player },
            VotingSystem = votingSystem,
            VotingCardsTopRow = votingCardRows.Item1,
            VotingCardsBottomRow = votingCardRows.Item2,
            GroupId = groupId
        };
    }
    
    public PlayerModel CreatePlayer(string playerName, string clientId, string playerMode)
    {
        return new PlayerModel()
        {
            Id = clientId,
            Name = SanitisePlayerName(playerName),
            PlayerMode = playerMode
        };
    }

    public string CreateGroup(string clientId)
    {
        var groupId = Guid.NewGuid().ToString();
        _hub.Groups.AddToGroupAsync(clientId, groupId);
        
        return groupId;
    }

    public GameModel UpdatePlayerVote(GameModel gameModel, int cardValue, string playerId)
    {
        var playerToUpdate = gameModel.Players.FirstOrDefault(x => x.Id == playerId);
        if (playerToUpdate != null) 
            playerToUpdate.Vote = cardValue;

        gameModel.AverageScore = CalculateAverageScore(gameModel.Players);
        
        return gameModel;
    }
    
    public GameModel UpdatePlayerId(GameModel gameModel, string oldPlayerId, string newPlayerId)
    {
        var playerToUpdate = gameModel.Players.FirstOrDefault(x => x.Id == oldPlayerId);
        if (playerToUpdate != null)
            playerToUpdate.Id = newPlayerId;
        
        return gameModel;
    }
    

    public GameModel ResetPlayerVotes(GameModel gameModel)
    {
        foreach (var player in gameModel.Players)
            player.Vote = 0;

        gameModel.AverageScore = CalculateAverageScore(gameModel.Players);
        gameModel.ScoresDisplayed = false;
        
        return gameModel;
    }
    
    public GameModel ShowScores(GameModel gameModel)
    {
        gameModel.ScoresDisplayed = true;
        
        return gameModel;
    }

    public GameModel AddPlayerToGame(GameModel game, PlayerModel player, string groupId)
    {
        if (game.Players.Count > 9)
            throw new Exception("Game is at maximum capacity");

        _hub.Groups.AddToGroupAsync(player.Id, groupId);
        game.Players.Add(player);
        
        return game;
    }

    public GameModel RemovePlayerFromGame(GameModel game, PlayerModel player)
    {
        game.Players.Remove(player);
        
        return game;
    }
    
    private static Tuple<List<int>, List<int>> SplitCardsToRows(IList<int> votingCardsVales)
    {
        var topRow = new List<int>();
        var bottomRow = new List<int>();
        var topRowCount = (int)Math.Ceiling(votingCardsVales.Count / 2.0);

        for (var i = 0; i < topRowCount; i++)
            topRow.Add(votingCardsVales[i]);

        for (var i = topRowCount; i < votingCardsVales.Count; i++)
            bottomRow.Add(votingCardsVales[i]);

        return Tuple.Create(topRow, bottomRow);
    }

    private static double CalculateAverageScore(IEnumerable<PlayerModel> players)
    {
        var totalScore = 0;
        var playerCount = 0;

        foreach (var player in players)
        {
            if (player.Vote < 1)
                continue;
                
            totalScore += player.Vote;
            playerCount++;
        }

        var averageScore = playerCount > 0 ? (double)totalScore / playerCount : 0;
        
        return Math.Round(averageScore, 1);
    }

    private static string SanitisePlayerName(string playerName)
    {
        return Regex.Replace(playerName, "[^a-zA-Z0-9]", "");
    }
}

