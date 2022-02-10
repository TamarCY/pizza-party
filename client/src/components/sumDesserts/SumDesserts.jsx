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
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';

const SumDesserts = () => {
     const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
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

useEffect(()=>{
    console.log(partyObject);
    if(partyObject.sumOfDessertsOrders){
        setDessertsKeys(Object.keys(partyObject.sumOfDessertsOrders))
        setDessertsValues(Object.values(partyObject.sumOfDessertsOrders))

    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

 const options = {
    responsive: true,
    plugins: {
        legend: {
            // position: 'top' as const,
            position: 'top',
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
        // {
        //     label: 'Dataset 1',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // },
        {
            label: 'Dataset 2',
            data: dessertsValues,
            backgroundColor: 'rgba(255, 173, 96, 0.5)',
        },
    ],
};




   
    return (
        <Bar options={options} data={data} />
    )
}

export default SumDesserts


