import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Piechart from "./Piechart";
import { Card } from "react-bootstrap";
import Plot from 'react-plotly.js';
import RadarChart from "./RadarChart";
import DoughnutChart from "./DoughnutChart";
import ColorChanger from "./ColorChanger";

const ExcelChart = () => {
  const [chartData, setChartData] = useState([]);
  const [color, SetColor] = useState([
    "rgba(185,32,233,22)",
    "rgba(134,15,23,22)",
    "rgba(246,10,23,22)",
    "rgba(081,302,23,22)",
    "rgba(459,302,23,22)",
    "rgba(0,0,255)",
  ]);

  const handleColorChange = (newColor) => {
    SetColor(newColor.hex);
  };

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setChartData(parsedData);
    };
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Data Fetched",
        data: [],
        // backgroundColor: [
        //   "rgba(185,32,233,22)",
        //   "rgba(134,15,23,22)",
        //   "rgba(246,10,23,22)",
        //   "rgba(081,302,23,22)",
        //   "rgba(459,302,23,22)",
        //   "rgba(0,0,255)",
        // ],
        backgroundColor: color,
        borderWidth: 5,
      },
    ],
  });

  useEffect(() => {
    const updatedData = {
      ...data,
      labels: chartData.map((data) => data.__EMPTY),
      datasets: [
        {
          ...data.datasets[0],
          data: chartData.map((data) => data.__EMPTY_1),
        },
      ],
    };
    setData(updatedData);
  }, [chartData]);

  return (
    <>
      <div>
        <div className="d-flex container m-5 w-100 justify-content-center">
          <input className="form-control form-control-lg" id="formFileLg" type="file" accept=".xlsx"
            onChange={handleFileUpload} />
        </div>
      </div>


      <div className="container">
        <ColorChanger color={color} onchange={handleColorChange} />
      </div>


      <div>
        <Card
          className="shadow mt-5 p-5 bg-color text-dark"
          style={{ width: "70%", margin: "auto", border: "5px solid Cyan" }}>
          <h3 className="text-center">Bar chart Visualizer</h3>
          <BarChart data={data} />
        </Card>

        <Card
          className="shadow mt-5 p-5 bg-color text-dark"
          style={{ width: "70%", margin: "auto", border: "5px solid cyan" }}>
          <h3 className="text-center">Line chart Visualizer</h3>
          <LineChart data={data} />
        </Card>


        <Card
          className="shadow mt-5 p-5 bg-color text-dark"
          style={{ width: "70%", margin: "auto", border: "5px solid cyan" }}>
          <h3 className="text-center">Radar chart Visualizer</h3>
          <RadarChart data={data} />
        </Card>

        <Card
          className="shadow mt-4 p-5 bg-color text-dark"
          style={{ width: "70%", margin: "auto", border: "5px solid cyan" }} >
          <h3 className="text-center">Pie chart Visualizer</h3>
          <Piechart data={data} />
        </Card>

        <Card
          className="shadow mt-4 mb-5 p-5 bg-color text-dark"
          style={{ width: "70%", margin: "auto", border: "5px solid cyan" }} >
          <h3 className="text-center">Doughnut chart Visualizer</h3>
          <DoughnutChart data={data} />
        </Card>


        {/* 
        <Card
          className="shadow mt-4 p-5 bg-color text-dark"
          style={{ width: "80%", margin: "auto", border: "5px solid cyan" }} >
          <h3 className="text-center">Clustered Column Visualizer</h3>
          <Plot
            data={data}
            layout={{ width: 500, height: 500, title: 'Clustered Column Visualizer' }} />
        </Card> */}
      </div>
    </>
  );
};

export default ExcelChart;
