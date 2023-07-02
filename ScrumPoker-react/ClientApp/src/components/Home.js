import React, {useState} from 'react';
const Home = () => {

    const [playerName, setPlayerName] = useState("")
    const [votingSystem, setVotingSystem] = useState("1, 2, 3, 5, 8, 13, 21, 34")
    const [customVotingSystem, setCustomVotingSystem] = useState("")
    const [displayCustomInput, setDisplayCustomInput] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Player Name: " + playerName)
        console.log("Voting System: " + votingSystem)
        console.log("Custom Voting System: " + customVotingSystem)

        // Add front end validation
        
        sendData().then((response) => console.log("api response: " + response))
    }
    
    const handleVotingSystemChange = (e) => {
        setVotingSystem(e.target.value)
        setDisplayCustomInput(votingSystem !== "Custom")
    }

    const sendData = async () => {
        const url = 'https://localhost:7050/Home/StartGame';

        const data = {
            playerName: playerName,
            votingSystem: votingSystem,
            customVotingSystem: customVotingSystem
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="logoDiv">
                <img src="/ScrumPokerShowdownLogo.png" alt="Scrum Poker Logo" id="homeScreenLogo" />
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
                            <>
                                <label htmlFor="customVotingSystem" className="customInputLabel">
                                    Please enter comma separated values
                                </label>
                                <input
                                    type="text"
                                    id="customVotingSystem"
                                    name="customVotingSystem"
                                    className="input formBorder"
                                    onChange={(e) => 
                                        setCustomVotingSystem(e.target.value)}
                                />
                            </>
                        }
                        <input type="submit" value="Start" className="submitButton"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
