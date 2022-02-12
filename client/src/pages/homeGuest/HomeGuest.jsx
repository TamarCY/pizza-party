import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import Api from "../../api/Api";
import { useSetRecoilState, useRecoilValue } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import pizza from "../../assets/images/pizza.png"
import "./homeGuest.css"

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

    if (!date) return (<div className="loader"></div>)
    return (
        <div  className="homeGuest-container">
            <div className="homeGuest-main">
                {/* <img className="homeGuest-img" src={pizza} alt="pizza" /> */}
                {(!isDecline) && <div>
                    <h2 >{`${partyObject.firstName} ${partyObject.lastName} invited you to a Pizza Party!`}</h2>
                    <h3>{date}</h3>
                    <h3>{hour}</h3>
                    <h3>in {partyObject.address}</h3>
                    <img className="homeGuest-img" src={pizza} alt="pizza" />
                    <div className="homeGuest-button">
                        <Link to="/guest-edit">
                            <button className="button-48" ><span class="text">Great! I am in!</span></button>
                        </Link>
                        <button className="button-48" onClick={handelDecline}><span class="text">Sorry, I can't come</span></button>
                    </div>
                </div>}

                <div>
                    {isDecline &&
                        <div>
                            <img className="homeGuest-img" src={pizza} alt="pizza" />
                            <h2>Thanks for the update! </h2>
                            <h3>Click <a href={whatsAppLink} target="_blank" >here</a> if you want to response in a whatsApp message</h3>
                            <button className="button-48" onClick={handelDecline}><span class="text">back</span></button>
                        </div>}
                </div>
            </div>
        </div>

        
    )

    // <button className="button-48" role="button" ><span class="text">Great! I am in!</span></button>

}

export default HomeGuest