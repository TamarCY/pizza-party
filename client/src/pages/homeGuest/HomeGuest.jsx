import React from "react";
import { useEffect } from "react";
import {useParams} from "react-router-dom"


const HomeGuest = () => {
    const params = useParams();
    
    useEffect(()=>{
        
    })
    console.log(params);
    return (
        <div>Guest</div>
    )
}

export default HomeGuest