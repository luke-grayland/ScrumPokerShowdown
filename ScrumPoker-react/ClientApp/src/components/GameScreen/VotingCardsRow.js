import VotingCard from "../VotingCard/VotingCard";

const VotingCardsRow = ({votingCardsRow, setSelectedCard, selectedCard, showScores, groupId, spectatorMode}) => {
    return(
        <div className={"votingCardsRow" + (spectatorMode ? " spectatorMode" : "")}>
            {votingCardsRow && votingCardsRow.map((cardValue) => (
                <VotingCard key={cardValue}
                            cardValue={cardValue}
                            setSelectedCard={setSelectedCard}
                            selectedCard={selectedCard}
                            showScores={showScores}
                            groupId={groupId}/>
            ))}
        </div>
    )
}

export default VotingCardsRow