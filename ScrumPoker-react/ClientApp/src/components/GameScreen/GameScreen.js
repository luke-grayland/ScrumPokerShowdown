import React, {useContext, useEffect, useState} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard";
import GameContext from '../../contexts/GameContext'
import NavBar from "../NavBar/NavBar";
import InviteWindow from "../InviteWindow/InviteWindow";
import {ResetPlayerVotes, ShowScores} from "./GameScreenHelper";
import VotingCardsRow from "./VotingCardsRow";
import ClientContext from "../../contexts/ClientContext";
import {useNavigate} from "react-router-dom";
import {StyledKofiButton} from "../KofiButton/KofiButton";
import {LocalGameContextKey, LocalPlayerKey, ConstPlayerMode} from "../../Constants";

const GameScreen = () => {
    const {gameContext, updateGameContext} = useContext(GameContext)
    const [players, setPlayers] = useState()
    const [votingCardsTopRow, setVotingCardsTopRow] = useState()
    const [votingCardsBottomRow, setVotingCardsBottomRow] = useState()
    const [showInviteWindow, setShowInviteWindow] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [averageResult, setAverageResult] = useState(0)
    const [showScores, setShowScores] = useState(false)
    const {clientContext} = useContext(ClientContext)
    const [groupId, setGroupId] = useState("")
    const [clientId, setClientId] = useState("")
    const navigate = useNavigate()
    const [spectatorMode, setSpectatorMode] = useState(false)
    const [spectatorCount, setSpectatorCount] = useState(0)
    const [spectatorList, setSpectatorList] = useState()

    window.onpopstate = () => navigate("/")
    
    if (clientContext)
    {
        clientContext.clientConnection.on("ReceiveUpdatedGameModel", data => updateGameContext(JSON.parse(data)))
        clientContext.clientConnection.on("ClearCardSelection", () => setSelectedCard(null))
    }

    useEffect(() => {
        const localGameContext = window.localStorage.getItem(LocalGameContextKey)
        
        if(localGameContext !== null) {
            const parsedLocalGameContext = JSON.parse(localGameContext)
            updateGameContext({...parsedLocalGameContext})
        }
    }, [])
    
    useEffect(() => {
        if (players !== null && Array.isArray(players)) {
            const thisPlayer = players.find(x => x.Id === clientId)
            const playerIsSpectator = thisPlayer?.Mode === ConstPlayerMode.Spectator
            
            setSpectatorMode(playerIsSpectator)
            window.localStorage.setItem(LocalPlayerKey, JSON.stringify(thisPlayer))
        }
    }, [players])
    
    useEffect(() => {
        if(clientContext?.clientId)
            setClientId(clientContext.clientId)
    }, [clientContext])
    
    useEffect(() => {
        if (gameContext === undefined)
            return
        
        setPlayers(gameContext.Players)
        setVotingCardsTopRow(gameContext.VotingCardsTopRow)
        setVotingCardsBottomRow(gameContext.VotingCardsBottomRow)
        setAverageResult(gameContext.AverageScore)
        setShowScores(gameContext.ScoresDisplayed)
        setGroupId(gameContext.GroupId)
        
        let spectatorCount = gameContext.Players.filter(x => x.Mode == ConstPlayerMode.Spectator).length 
        setSpectatorCount(spectatorCount)
        
        if(spectatorCount > 0)
        {
            let spectatorList = gameContext.Players
                .filter(item => item.Mode == ConstPlayerMode.Spectator)
                .map((item, index) => (
                <h5 className="m-1" key={index}>{item.Name}</h5>
            ));
            setSpectatorList(spectatorList)    
        }
        
        if (clientContext)
            clientContext.clientConnection.invoke("StoreGroupIdInHubContext", gameContext.GroupId)
        
        window.localStorage.setItem(LocalGameContextKey, JSON.stringify(gameContext))
    }, [gameContext])

    const toggleShowHideButton = () => showScores 
        ? ResetPlayerVotes(groupId).then() 
        : ShowScores(groupId).then()
    
    return (
        <>
            <NavBar showInviteWindow={showInviteWindow} 
                    setShowInviteWindow={setShowInviteWindow}
                    clientId={clientId}
                    groupId={groupId}
            />
            { showInviteWindow &&
                <InviteWindow setShowInviteWindow={setShowInviteWindow} groupIdProp={groupId}/>
            }
            <div className="results">
                <div id="resultsBoard" className="resultsBoard card shadowSmall bg-light">
                    <div className="average">
                        <h4>Average:</h4>
                        <h1 id="averageValue">
                            {(averageResult > 0 && showScores) ? averageResult.toString() : ""}
                        </h1>
                    </div>
                    <button id="showNewVoteButton" 
                            className="showHideButton btn btn-primary d-flex mx-auto buttonBlue" 
                            onClick={toggleShowHideButton}>
                        {showScores ? "New Vote" : "Show"}
                    </button>
                </div>
                { spectatorCount > 0 &&
                    <div className="spectatorBoard">
                        <h5 className="m-1">Spectators ({spectatorCount}):</h5>
                        <div>
                            {spectatorList}
                        </div>
                    </div>    
                }
            </div>
            <div className="players">
                {players && players.map((player) => {
                        return player.Mode === ConstPlayerMode.Player ? (
                            <PlayerCard key={player.Id} player={player} showScores={showScores} />
                        ) : null;
                    })}
            </div>
            <div className="votingCards">
                <VotingCardsRow votingCardsRow={votingCardsTopRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showScores={showScores}
                                groupId={groupId}
                                spectatorMode={spectatorMode}/>
                {spectatorMode &&
                    <div className="spectatorModeTextContainer">
                        <h5 className="spectatorModeText text-muted">Spectator Mode</h5>
                    </div>
                }
                <VotingCardsRow votingCardsRow={votingCardsBottomRow}
                                setSelectedCard={setSelectedCard}
                                selectedCard={selectedCard}
                                showScores={showScores}
                                groupId={groupId}
                                spectatorMode={spectatorMode}/>
            </div>
            <StyledKofiButton/>
        </>
    );
};

export default GameScreen;
