import KofiButton from "kofi-button"

export const StyledKofiButton = () => {
    return (
        <div className="kofiDiv">
            <h5 className="kofiText">Enjoying this app?</h5>
            <div className="kofiButton">
                <KofiButton color="#64CCC5" title="Buy Me a Coffee" kofiID="LazyGrayLabs"/>    
            </div>
        </div>
    )
}