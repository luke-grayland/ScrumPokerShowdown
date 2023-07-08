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
            return votingSystem.Split(",").Select(int.Parse).ToList();
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
    
    public PlayerModel CreatePlayer(string playerName)
    {
        return new PlayerModel()
        {
            Name = playerName
        };
    }
    
    private Tuple<List<int>, List<int>> SplitCardsToRows(IList<int> votingCardsVales)
    {
        var topRow = new List<int>();
        var bottomRow = new List<int>();
        var topRowCount = (int)Math.Ceiling(votingCardsVales.Count / 2.0);

        for (var i = 0; i < topRowCount; i++)
        {
            topRow.Add(votingCardsVales[i]);
        }

        for (var i = topRowCount; i < votingCardsVales.Count; i++)
        {
            bottomRow.Add(votingCardsVales[i]);
        }

        return Tuple.Create(topRow, bottomRow);
    }
}

