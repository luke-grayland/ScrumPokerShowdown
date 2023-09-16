const InfoCard = ({title, bodyText, footer}) => {
    
    return (
        <div className="card text-center w-50 shadowSmall infoCard">
            <div className="card-header">
                <img src="/scrumPokerLogoOnly.png" alt="Scrum Poker Logo" className="infoCardLogo" />
            </div>
            <div className="card-body p-4">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{bodyText}</p>
            </div>
            <div className="card-footer text-body-secondary">
                {footer ? <h5 className="m-1">{footer}</h5> : <img src={"/down_arrow.png"} alt="Down arrow" className="downArrow" />}
            </div>
        </div>
    )
}

export default InfoCard