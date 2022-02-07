import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import Api from "../../api/Api";
import { useSetRecoilState, useRecoilValue } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";

const HomeGuest = () => {
    const params = useParams();
    const setPartyObject = useSetRecoilState(partyState);
    const partyObject = useRecoilValue(partyState);
    const [date, setDate] = useState()
    const [hour, setHour] = useState()
    const [isDecline, setIsDecline] = useState(false)

    const handelDecline = () => {
        setIsDecline(!isDecline)
    }

    const whatsAppLink = `https://api.whatsapp.com/send?phone=+972${partyObject.phone}&text=Sorry,%20I%20Can't%20come%20to%20the%20party`

    useEffect(() => {
        // TODO: Change api call only if its a guest FileSystemEntry, if not get the data from the state
        const fetchData = async () => {
            const { data } = await Api.get(`party/invitation/${params.id}`);
            const editTime = () => {
                const time = new Date(data.date).getMinutes()
                if (time < 10) {
                    return `0${time}`
                }
                return time
            }
            setPartyObject(data)
            console.log(data);
            const newDate = new Date(data.date).toDateString()
            const hour = `${new Date(data.date).getHours()}:${editTime()}`
            setDate(newDate)
            setHour(hour)
        }
        try {
            fetchData()
        } catch (e) {
            console.log(e);
        }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , []
    )

    if (!date) return (<div>spinner....</div>)
    return (
        // TODO: add css and spinner, delete inline style
        <div>
            <div style={{ marginTop: "100px" }}>{`${partyObject.firstName} ${partyObject.lastName} invited you to a Pizza Party`}</div>
            <div>{date}</div>
            <div>{hour}</div>
            <div>in {partyObject.address}</div>
            {(!isDecline) && <div>
                <Link to="/guest-edit-details">
                    <button>Fun! I would love to participate</button>
                </Link>
                <button onClick={handelDecline}>Sorry, I can't come</button>
            </div>}
            <div>
                {isDecline && <div><div>Thanks for the update! <br /> Click <a href={whatsAppLink}>here</a> if you want to response in a whatsApp message</div>
                    <button onClick={handelDecline}>back</button></div>}
            </div>
        </div>
    )
}

export default HomeGuest