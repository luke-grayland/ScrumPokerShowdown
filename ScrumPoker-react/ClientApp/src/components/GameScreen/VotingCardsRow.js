import VotingCard from "../VotingCard/VotingCard";

const VotingCardsRow = ({votingCardsRow, setSelectedCard, selectedCard, showAverageResult}) => {
    return(
        <div className="votingCardsRow">
            {votingCardsRow.map((cardValue) => (
                <VotingCard key={cardValue}
                            cardValue={cardValue}
                            setSelectedCard={setSelectedCard}
                            selectedCard={selectedCard}
                            showAverageResult={showAverageResult}/>
            ))}
        </div>
    )
}

export default VotingCardsRow