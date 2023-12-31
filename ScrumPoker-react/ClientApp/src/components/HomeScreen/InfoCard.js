const InfoCard = ({title, bodyText, footer}) => {
    
    return (
        <div className="card text-center w-75 shadowSmall infoCard">
            <div className="card-header">
                <img src="/scrumPokerLogoOnly.png" alt="Scrum Poker Logo" className="infoCardLogo" />
            </div>
            <div className="card-body p-4">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{bodyText}</p>
            </div>
        </div>
    )
}

export default InfoCard