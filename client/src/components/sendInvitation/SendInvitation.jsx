import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import './sendInvitation.css'

// TODO: add phone and content number to the party object

const SendInvitation = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const partyObject = useRecoilValue(partyState);

    const handleWhatsapp = () => {
        setTimeout(clear, 2000)
        // setPhoneNumber("")
    }

    const clear = () => {
        setPhoneNumber("")
    }

    const phone = phoneNumber.slice(1)
    const whatsApp = `https://api.whatsapp.com/send?phone=+972${phone}&text=Party%20invitation%20https://pizza-party-app.herokuapp.com/guest-invitation/${partyObject._id}`


    return (
        <div className="step-component">
            <h2>
                send whatsApp invitation
            </h2>
            <div className="ui transparent input">
                {/* <div class="ui input focus"> */}
                <input type="tel" id="phone" name="phone" placeholder="Enter phone number"
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <a className="sendInvitation-link" href={whatsApp} target="_blank" onClick={handleWhatsapp}> <i class="whatsapp icon"></i></a>
            </div>
            {/* <a href={whatsApp} target="_blank" onClick={handleWhatsapp}>send whatsApp invitation</a>
            <button onClick={clear}>clear</button> */}
        </div>
    )
}

export default SendInvitation