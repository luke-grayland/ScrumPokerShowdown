namespace ScrumPoker_react.Models;

public class GameModel
{
    public IList<PlayerModel> Players { get; set; }
    public IList<int> VotingSystem { get; set; }
    public IList<int> VotingCardsTopRow { get; set; }
    public IList<int> VotingCardsBottomRow { get; set; }
    
    
}