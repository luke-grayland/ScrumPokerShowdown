using ScrumPoker_react.Models;

namespace ScrumPoker_react.Orchestrators;

public interface IGameOrchestrator
{
    public List<int> ValidateVotingSystem(NewGameModel votingSystem);
    public GameModel AssembleGameModel(IList<int> votingSystem, PlayerModel player);
    public PlayerModel CreatePlayer(string playerName, string clientId);
    public GameModel UpdatePlayerVote(GameModel gameModel, int cardValue, string playerId);
    public GameModel ResetPlayerVotes(GameModel gameModel);
    public GameModel ShowScores(GameModel gameModel);
    public GameModel AddPlayerToGame(GameModel game, PlayerModel player);
}