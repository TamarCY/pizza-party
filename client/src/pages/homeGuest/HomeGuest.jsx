import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Api from "../../api/Api";
import { useSetRecoilState , useRecoilValue} from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";

const HomeGuest = () => {
    const params = useParams();
    const setPartyObject = useSetRecoilState(partyState);
    const partyObject = useRecoilValue(partyState);
    const [date, setDate] = useState()
    const [hour, setHour] = useState()

    
   

    useEffect(() => {
       

        const fetchData = async () => {
            const {data} = await Api.get(`party/invitation/${params.id}`);
            const editTime = () => {
                const time = new Date(data.date).getMinutes()
               if( time.toString.length < 2) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
    )
    if(!date) return (<div>spinner....</div>) 
    return (
        // TODO: add css and spinner
        <div>
        <div style={{marginTop:"100px"}}>{`${partyObject.firstName} ${partyObject.lastName} invated you to a Pizza Party`}</div>
        <div>{`in ${partyObject.address}`}</div>
        {/* <div>{partyObject.date.toGMTString()}</div> */}
        <div>{date}</div>
        <div>{hour}</div>
        </div>
    )
}

export default HomeGuest