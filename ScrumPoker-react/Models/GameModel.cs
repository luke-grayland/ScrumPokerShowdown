namespace ScrumPoker_react.Models;

public class GameModel
{
    public IList<PlayerModel> Players { get; set; } = new List<PlayerModel>();
    public IList<int> VotingSystem { get; set; } = new List<int>();
    public IList<int> VotingCardsTopRow { get; set; } = new List<int>();
    public IList<int> VotingCardsBottomRow { get; set; } = new List<int>();
    public double AverageScore { get; set; }
    public bool ScoresDisplayed { get; set; }
    public string GroupId { get; set; } = "";


}