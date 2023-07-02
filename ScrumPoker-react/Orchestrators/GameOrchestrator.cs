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
        return new GameModel()
        {
            Players = new List<PlayerModel>() { player },
            VotingSystem = votingSystem
        };
    }
    
    public PlayerModel CreatePlayer(string playerName)
    {
        return new PlayerModel()
        {
            Name = playerName
        };
    }
    
}

