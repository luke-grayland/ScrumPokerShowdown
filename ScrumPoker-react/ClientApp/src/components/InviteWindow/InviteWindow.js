import React, {useContext, useEffect, useState} from 'react'
import ClientContext from "../../contexts/ClientContext";

const InviteWindow = ({setShowInviteWindow}) => {
    const {clientContext} = useContext(ClientContext)
    const [connectionId, setConnectionId] = useState("")
    const [copied, setCopied] = useState(false)
    
    useEffect(() => {
        setConnectionId(clientContext.clientId)
    }, [])
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(connectionId)
        setCopied(true)
        
        setTimeout(() => {
            setCopied(false);
            setShowInviteWindow(false)
        }, 700);
    }

    return(
        <>
            <div id="inviteWindow" className="toast show position-absolute fade-in" role="alert">
                <div className="toast-header justify-content-between">
                    <img id="inviteWindowLogo" src="/LogoChipOnly.png" className="rounded mr-2" alt="ScrumPokerLogo"/>
                    <strong className="mr-auto align-middle">Game ID</strong>
                    <button id="inviteWindowCloseButton" className="btn" onClick={() => setShowInviteWindow(false)}>
                        <img className="closeIcon" src="/close-icon.png"/>
                    </button>
                </div>
                <div className="input-group inviteWindowInput">
                    <input readOnly type="text" className="form-control" placeholder={connectionId}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary copyButton"
                                type="button"
                                onClick={handleCopyClick}>
                            <img src="/copy-icon.png" className="copyIcon"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`copied ${copied ? "show" : ""}`}>
                { copied &&
                    <strong className="mr-auto align-middle copiedLabel">Copied</strong>
                }
            </div>
        </>
    )
}

export default InviteWindow