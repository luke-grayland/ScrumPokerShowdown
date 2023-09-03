namespace ScrumPoker_react.Models;

public class UpdatePlayerVoteModel
{
    public int CardValue { get; set; }
    public string PlayerId { get; set; } = "";
    public string GroupId { get; set; } = "";
}