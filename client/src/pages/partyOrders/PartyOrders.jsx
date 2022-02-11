import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import Api from "../../api/Api";
import SumPizza from "../../components/sumPizza/SumPizza";
import SumDesserts from "../../components/sumDesserts/SumDesserts";
import SumDrinks from "../../components/sumDrinks/SumDrinks";
import "./partyOrders.css"


export default function PartyOrders() {
    const partyObject = useRecoilValue(partyState)
    if ((!partyObject.sumOfPizzaOrders) || Object.keys(partyObject.sumOfPizzaOrders).length === 0) {
        return <div style={{marginTop:"200px"}}></div>
        // TODO: change to nicer massage
    }
    
    // TODO: ADD SUM OF DRINKS AND SUM OF DESSERTS
    return (
        <div class="parent" >
            <div class="div1"><h2>Your guests orders</h2></div>
            <div class="div2"><SumDrinks /></div>
            <div class="div4"><SumPizza /></div>
            <div class="div3"><SumDesserts /> </div>
        </div>
    )
}