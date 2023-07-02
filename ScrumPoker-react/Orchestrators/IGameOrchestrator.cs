using ScrumPoker_react.Models;

namespace ScrumPoker_react.Orchestrators;

public interface IGameOrchestrator
{
    public List<int> ValidateVotingSystem(NewGameModel votingSystem);
    public GameModel AssembleGameModel(IList<int> votingSystem, PlayerModel player);
    public PlayerModel CreatePlayer(string playerName);
}