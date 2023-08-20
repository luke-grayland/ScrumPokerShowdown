import VotingCard from "../VotingCard/VotingCard";

const VotingCardsRow = ({votingCardsRow, setSelectedCard, selectedCard, showScores, groupId}) => {
    return(
        <div className="votingCardsRow">
            {votingCardsRow.map((cardValue) => (
                <VotingCard key={cardValue}
                            cardValue={cardValue}
                            setSelectedCard={setSelectedCard}
                            selectedCard={selectedCard}
                            showScores={showScores}
                            groupId={groupId}
                />
            ))}
        </div>
    )
}

export default VotingCardsRow