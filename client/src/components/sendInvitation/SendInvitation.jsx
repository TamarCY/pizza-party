import React, { useState } from "react"


const SendInvitation = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
        const phone = phoneNumber.slice(1)
        const wlink = `https://api.whatsapp.com/send?phone=+972${phone}&text=Party%20invitation%20`
    

    return (
        <div>
            <div>
            send invitation
            </div>
            <input type="tel" id="phone" name="phone"  
            value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            {/* <button onClick={sendMessage}>enter number</button> */}
            <a href={wlink}>send invitation</a>
            



        </div>
    )
}

export default SendInvitation