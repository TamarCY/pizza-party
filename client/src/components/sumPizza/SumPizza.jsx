import React from "react";
import { useRecoilValue } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';


export default function SumPizza() {
    const partyObject = useRecoilValue(partyState);

    const renderPizzaTable = () => {
        return Object.keys(partyObject.sumOfPizzaOrders).map((oneKey, i) => {
            return (
                <tr key={i}>
                    <td>{oneKey}</td>
                    <td>{partyObject.sumOfPizzaOrders[oneKey]}</td>
                </tr>
            )
        })
    }


    return (
        <div className="ui container">
            <table className="ui tow column table">
                <thead>
                    <tr><th>Pizza</th>
                        <th>Amount</th>
                    </tr></thead>
                <tbody>
                    {renderPizzaTable()}
                </tbody>
                <tfoot>
                    <tr><th></th>
                        <th>{partyObject.totalPizzaNum} total</th>
                    </tr></tfoot>
            </table>
        </div>
    )
}