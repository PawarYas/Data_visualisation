import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data }) => {
    return (
        <>
            <Doughnut data={data} />
        </>
    )
}

export default DoughnutChart