import React from "react";
import { useRecoilValue } from "recoil";
import WineBarRoundedIcon from '@mui/icons-material/WineBarRounded';
import partyState from '../../Recoil/atoms/partyAtom';

const SumDrinks = () => {
    const partyObject = useRecoilValue(partyState);

    const renderIcons = (n) => {
        const result = [];
        for (let i = 0; i < n; i++) {
            result.push(<WineBarRoundedIcon />)
        }
        return result
    }

    const renderDrinkSum = () => {
        let result = []
        for (const drink in partyObject.sumOfDrinksOrders) {
            result.push(<tr><td>{drink}</td><td>{renderIcons(partyObject.sumOfDrinksOrders[drink])}</td></tr>)
        }
        return (
            result
        )
    }

    if (!partyObject.sumOfDrinksOrders) { return <div>spinner...</div> }
    return (
        <div className="ui container">
            <table class="ui very basic table">
                <h5>Drinks</h5>
                <tbody>
                    {renderDrinkSum()}
                </tbody>
            </table>
        </div>
    )
}

export default SumDrinks


