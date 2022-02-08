import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import Api from "../../api/Api";


export default function PartyOrders() {
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);


    const renderPizzaTable = () => {
        return Object.keys(partyObject.sumOfPizzaOrders).map((oneKey,i)=>{
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
            <table className="ui tow column table" style={{marginTop: 300}}>
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