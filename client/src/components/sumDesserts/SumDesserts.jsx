import React from "react";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useRecoilValue } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';

const SumDesserts = () => {
    const partyObject = useRecoilValue(partyState);
    const [dessertsKeys, setDessertsKeys] = useState([])
    const [dessertsValues, setDessertsValues] = useState([])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        if (partyObject.sumOfDessertsOrders) {
            setDessertsKeys(Object.keys(partyObject.sumOfDessertsOrders))
            setDessertsValues(Object.values(partyObject.sumOfDessertsOrders))

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Desserts Votes',
            },
        },
    };

    const labels = dessertsKeys

    const data = {
        labels,
        datasets: [
            {
                id: 1,
                label: "",
                data: dessertsValues,
                backgroundColor: 'rgba(255, 173, 96, 0.5)',
            },
        ],
    };

    return (
        <div className="ui container">
        <Bar options={options} data={data} />
        </div>
    )
}

export default SumDesserts


