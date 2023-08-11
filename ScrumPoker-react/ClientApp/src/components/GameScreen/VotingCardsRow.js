import VotingCard from "../VotingCard/VotingCard";

const VotingCardsRow = ({votingCardsRow, setSelectedCard, selectedCard, showScores}) => {
    return(
        <div className="votingCardsRow">
            {votingCardsRow.map((cardValue) => (
                <VotingCard key={cardValue}
                            cardValue={cardValue}
                            setSelectedCard={setSelectedCard}
                            selectedCard={selectedCard}
                            showScores={showScores}/>
            ))}
        </div>
    )
}

export default VotingCardsRow