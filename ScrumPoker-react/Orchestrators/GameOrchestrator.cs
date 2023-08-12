using ScrumPoker_react.Models;

namespace ScrumPoker_react.Orchestrators;

public class GameOrchestrator : IGameOrchestrator
{
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

    public GameModel AssembleGameModel(IList<int> votingSystem, PlayerModel player)
    {
        var votingCardRows = SplitCardsToRows(votingSystem);
        
        return new GameModel()
        {
            Players = new List<PlayerModel>() { player },
            VotingSystem = votingSystem,
            VotingCardsTopRow = votingCardRows.Item1,
            VotingCardsBottomRow = votingCardRows.Item2
        };
    }
    
    public PlayerModel CreatePlayer(string playerName, string clientId)
    {
        return new PlayerModel()
        {
            Id = clientId,
            Name = playerName
        };
    }

    public GameModel UpdatePlayerVote(GameModel gameModel, int cardValue, string playerId)
    {
        var playerToUpdate = gameModel.Players.FirstOrDefault(x => x.Id == playerId);
        if (playerToUpdate != null) 
            playerToUpdate.Vote = cardValue;

        gameModel.AverageScore = CalculateAverageScore(gameModel.Players);
        
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

    public GameModel AddPlayerToGame(GameModel game, PlayerModel player)
    {
        if (game.Players.Count > 9)
            throw new Exception("Game is at maximum capacity");
        
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

    private static int CalculateAverageScore(IEnumerable<PlayerModel> players)
    {
        var totalScore = 0;
        var playerCount = 0;

        foreach (var player in players)
        {
            totalScore += player.Vote;
            playerCount++;
        }

        return playerCount > 0 ? totalScore / playerCount : 0;
    }
}

