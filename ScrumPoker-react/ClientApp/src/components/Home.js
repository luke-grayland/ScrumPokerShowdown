import React from 'react';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            votingSystem: '1, 2, 3, 5, 8, 13, 21, 34'
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    }

    render() {
        return (
            <div>
                <div className="logoDiv">
                    <img src="../../public/ScrumPokerShowdownLogo.png" alt="Scrum Poker Logo" id="homeScreenLogo" />
                </div>
                <div className="startScreen">
                    <div className="startScreenContent shadowSmall">
                        <form className="startScreenForm" onSubmit={this.handleSubmit}>
                            <label htmlFor="playerName">Player Name</label>
                            <input
                                type="text"
                                id="playerName"
                                name="playerName"
                                className="input formBorder"
                                value={this.state.playerName}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="votingSystem">Voting System</label>
                            <select
                                id="votingSystem"
                                name="votingSystem"
                                className="input formBorder"
                                value={this.state.votingSystem}
                                onChange={this.handleInputChange}
                            >
                                <option value="1, 2, 3, 5, 8, 13, 21, 34">1, 2, 3, 5, 8, 13, 21, 34</option>
                                <option value="Custom">Custom</option>
                            </select>

                            <input type="submit" value="Start" className="submitButton" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}