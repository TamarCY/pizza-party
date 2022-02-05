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

    

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await Api.get(`party/invitation/${params.id}`);
            setPartyObject(data)
            setDate(data.date)
        }
        try {
            fetchData()
        } catch (e) {
            console.log(e);
        }
    }
    )
    return (
        // TODO: add css
        <div>
        <div style={{marginTop:"100px"}}>{`${partyObject.firstName} ${partyObject.lastName} invated you to a Pizza Party`}</div>
        <div>{`in ${partyObject.address}`}</div>
        <div>{date}</div>
        </div>
    )
}

export default HomeGuest