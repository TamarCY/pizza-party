import React from "react";
import { useState } from "react";
import Api from "../../api/Api"


const SignUp = ({ setToken, token }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const partySignUp = async () => {
        try {
            // const { data: { token } } = await Api.post("/party/signup", { firstName, lastName, email, password })
            const {data:{token, party}} = await Api.post("/party/signup", { firstName, lastName, email, password })
            setToken(token)
            console.log(`welcome ${party.firstName}`);
        } catch (e) {
            console.error(e.message)
        }
    }

    const getParty = async () => {
        try {
            const party = await Api.get("/party/me", {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(party);
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div >
            <input type="text" placeholder="First Name" name="first" value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }} />
            <input type="text" placeholder="Last Name" name="last" value={lastName}
                onChange={(e) => { setLastName(e.target.value) }} />
            <input type="text" placeholder="Email" name="email" value={email}
                onChange={(e) => { setEmail(e.target.value) }} />
            <input type="text" placeholder="Password" name="password" password={password}
                onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={partySignUp}>submit</button>
            <button onClick={getParty}> log party</button>
        </div>
    );
}

export default SignUp;