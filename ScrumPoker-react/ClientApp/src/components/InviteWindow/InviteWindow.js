import React, {useContext, useEffect, useState} from 'react'
import ClientContext from "../../contexts/ClientContext";

const InviteWindow = () => {
    const {clientContext} = useContext(ClientContext)
    const [connectionId, setConnectionId] = useState("")
    
    useEffect(() => {
        setConnectionId(clientContext.clientId)
    }, [])
    
    return(
        <div id="inviteWindow" className="toast show position-absolute" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header justify-content-between">
                <img id="inviteWindowLogo" src="/LogoChipOnly.png" className="rounded mr-2" alt="ScrumPokerLogo" />
                <strong className="mr-auto align-middle">Invite Players</strong>
                <button id="inviteWindowCloseButton" type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                {connectionId}
            </div>
        </div>
    )
}

export default InviteWindow