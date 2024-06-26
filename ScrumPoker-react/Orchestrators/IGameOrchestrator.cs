using ScrumPoker_react.Models;

namespace ScrumPoker_react.Orchestrators;

public interface IGameOrchestrator
{
    public List<float> ValidateVotingSystem(NewGameModel votingSystem);
    public GameModel AssembleGameModel(IList<float> votingSystem, PlayerModel player, string groupId);
    public PlayerModel CreatePlayer(string playerName, string clientId, string playerMode);
    public string CreateGroup(string clientId);
    public GameModel UpdatePlayerVote(GameModel gameModel, float cardValue, string playerId);
    public GameModel ResetPlayerVotes(GameModel gameModel);
    public GameModel ShowScores(GameModel gameModel);
    public GameModel AddPlayerToGame(GameModel game, PlayerModel player, string groupId);
    public GameModel RemovePlayerFromGame(GameModel game, PlayerModel player);
}