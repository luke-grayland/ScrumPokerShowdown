import React, {useContext, useEffect, useState} from 'react'
import ClientContext from "../../contexts/ClientContext";
import {GameIdQueryParameterText} from "../JoinScreen/JoinScreenHelper";

const InviteWindow = ({setShowInviteWindow, groupIdProp}) => {
    const {clientContext} = useContext(ClientContext)
    const [connectionId, setConnectionId] = useState("")
    const [copied, setCopied] = useState(false)
    const [groupId, setGroupId] = useState("")
    
    useEffect(() => {
        setConnectionId(clientContext.clientId)
        setGroupId(groupIdProp)
    }, [])
    
    const GetJoinLink = () => process.env.REACT_APP_MAIN_URL 
        + "join?" 
        + GameIdQueryParameterText 
        + "=" 
        + connectionId 
        + "%2B" 
        + groupId
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(GetJoinLink()).then()
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
                    <img id="inviteWindowLogo" src="/scrumPokerLogoOnly.png" className="rounded mr-2" alt="ScrumPokerLogo"/>
                    <strong className="mr-auto align-middle">Game ID</strong>
                    <button id="inviteWindowCloseButton" className="btn" onClick={() => setShowInviteWindow(false)}>
                        <img className="closeIcon" src="/close-icon.png"/>
                    </button>
                </div>
                <div className="input-group inviteWindowInput">
                    <input readOnly type="text" className="form-control" placeholder={GetJoinLink()}/>
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