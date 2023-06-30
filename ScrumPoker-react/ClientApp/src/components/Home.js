import React, {useState} from 'react';
const Home = () => {

    const [playerName, setPlayerName] = useState("")
    const [votingSystem, setVotingSystem] = useState("1, 2, 3, 5, 8, 13, 21, 34")
    const [displayCustomInput, setDisplayCustomInput] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Player Name: " + playerName)
        console.log("Voting System: " + votingSystem)

        // Front end validation

        // Send to API
    }
    
    const handleVotingSystemChange = (e) => {
        setVotingSystem(e.target.value)
        setDisplayCustomInput(votingSystem !== "Custom")
    }
    
    const handleCustomInput = (e) => {
        console.log(e.target.value)
    }
    
    return (
        <div>
            <div className="logoDiv">
                <img src="../../public/ScrumPokerShowdownLogo.png" alt="Scrum Poker Logo" id="homeScreenLogo" />
            </div>
            <div className="startScreen">
                <div className="startScreenContent shadowSmall">
                    <form className="startScreenForm" onSubmit={handleSubmit}>
                        <label htmlFor="playerName">Player Name</label>
                        <input
                            type="text"
                            id="playerName"
                            name="playerName"
                            className="input formBorder"
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                        <label htmlFor="votingSystem">Voting System</label>
                        <select
                            id="votingSystem"
                            name="votingSystem"
                            className="input formBorder"
                            onChange={handleVotingSystemChange}>
                            <option value="1, 2, 3, 5, 8, 13, 21, 34">1, 2, 3, 5, 8, 13, 21, 34</option>
                            <option value="Custom">Custom</option>
                        </select>
                        { displayCustomInput &&
                            <input
                                type="text"
                                id="customVotingSystem"
                                name="customVotingSystem"
                                className="input formBorder"
                                onChange={handleCustomInput}
                            />
                        }
                        <input type="submit" value="Start" className="submitButton"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
