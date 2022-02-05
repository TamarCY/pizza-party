import React, { useState } from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';

// TODO: add phone and content number to the party object

const SendInvitation = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const partyObject = useRecoilValue(partyState);

        const handleWhatsapp = () => {
            setPhoneNumber("")
        }

        const phone = phoneNumber.slice(1)
        const whatsApp = `https://api.whatsapp.com/send?phone=+972${phone}&text=Party%20invitation%20https://pizza-party-app.herokuapp.com/invitation/${partyObject._id}`
    

    return (
        <div>
            <div>
            send invitation
            </div>
            <input type="tel" id="phone" name="phone"  
            value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            <a href={whatsApp} target="_blank" onClick={handleWhatsapp}>send whatsApp invitation</a>
        </div>
    )
}

export default SendInvitation