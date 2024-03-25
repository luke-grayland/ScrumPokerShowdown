namespace ScrumPoker_react.Models;

public class GameModel
{
    public IList<PlayerModel> Players { get; set; } = new List<PlayerModel>();
    public IList<float> VotingSystem { get; set; } = new List<float>();
    public IList<float> VotingCardsTopRow { get; set; } = new List<float>();
    public IList<float> VotingCardsBottomRow { get; set; } = new List<float>();
    public double AverageScore { get; set; }
    public bool ScoresDisplayed { get; set; }
    public string GroupId { get; set; } = "";


}