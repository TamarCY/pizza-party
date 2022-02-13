import React from "react";
import { useRecoilValue } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import SumPizza from "../../components/sumPizza/SumPizza";
import SumDesserts from "../../components/sumDesserts/SumDesserts";
import SumDrinks from "../../components/sumDrinks/SumDrinks";
import "./partyOrders.css"


export default function PartyOrders() {
    const partyObject = useRecoilValue(partyState)
    if ((!partyObject.sumOfPizzaOrders) || Object.keys(partyObject.sumOfPizzaOrders).length === 0) {
        return <div className="loader"></div>
    }
    return (
        <>
        <h2>Your guests orders</h2>
        <div class="parent" >
            <div class="div1"><SumDrinks /></div>
            <div class="div2"><SumDesserts /> </div>
            <div class="div3"><SumPizza /></div>
        </div>
        </>
    )
}