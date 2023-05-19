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
  const [BgColor, SetBgColor] = useState("#fff");
  const [color, SetColor] = useState(["cyan,gray,green"]);

  const handleColorChange = (e) => {
    SetBgColor(e.target.value);
  };

  const [value, SetValue] = useState("")

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
        backgroundColor: [
          "rgba(185,32,233,22)",
          "rgba(134,15,23,22)",
          "rgba(246,10,23,22)",
          "rgba(081,302,23,22)",
          "rgba(459,302,23,22)",
          "rgba(0,0,255)",
        ],
        borderWidth: 5,
      },
    ],
  });

  useEffect(() => {
    const updatedColor = [...data.datasets[0].backgroundColor];
    updatedColor[value] = BgColor;
    SetColor(updatedColor);
    SetBgColor('')
  }, [BgColor, color]);


  useEffect(() => {
    const updatedData = {
      ...data,
      labels: chartData.map((data) => data.__EMPTY),
      datasets: [
        {
          ...data.datasets[0],
          data: chartData.map((data) => data.__EMPTY_1),
          backgroundColor: color
        },
      ],
    };
    setData(updatedData);
  }, [chartData, BgColor]);

  return (
    <>
      <div>
        <div className="d-flex container m-5 w-100 justify-content-center">
          <input className="form-control form-control-lg" id="formFileLg" type="file" accept=".xlsx"
            onChange={handleFileUpload} />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        <div className="container w-25">
          <label className='fw-bolder'>Choose Color</label>
          <input className="form-control form-control-lg mt-1" type="color" value={BgColor}
            onChange={handleColorChange} />
        </div>

        <div className="container w-25">
          <label className='fw-bolder'>Choose Value</label>
          <input className=" form-control form-control-lg mt-1" type="number" placeholder="Enter a Value" onChange={(e) => { SetValue(e.target.value) }} />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Card
            className="shadow mt-5 p-5 bg-color text-dark"
            style={{ width: "80%", margin: "auto", border: "5px solid Cyan" }}>
            <h3 className="text-center fw-bolder">Bar chart Visualizer</h3>
            <BarChart data={data} />
          </Card>
        </div>
        <div class="col">
          <Card
            className="shadow mt-5 p-5 bg-color text-dark"
            style={{ width: "80%", margin: "auto", border: "5px solid cyan" }}>
            <h3 className="text-center fw-bolder">Line chart Visualizer</h3>
            <LineChart data={data} />
          </Card>
        </div>
      </div>


      <div class="row">
        <div class="col">
          <Card
            className="shadow p-5 mt-5 bg-color text-dark"
            style={{ width: "80%", margin: "auto", border: "5px solid cyan" }}>
            <h3 className="text-center fw-bolder">Radar chart Visualizer</h3>
            <RadarChart data={data} />
          </Card>

        </div>
        <div class="col">
          <Card
            className="shadow p-5 mt-5 bg-color text-dark"
            style={{ width: "80%", margin: "auto", border: "5px solid cyan" }} >
            <h3 className="text-center fw-bolder">Pie chart Visualizer</h3>
            <Piechart data={data} />
          </Card>
        </div>
      </div>



      <div class="row">
        <div class="col">
          <Card
            className="shadow mt-5 mb-5 p-5 bg-color text-dark "
            style={{ width: "80%", margin: "auto", border: "5px solid cyan" }} >
            <h3 className="text-center fw-bolder">Doughnut chart Visualizer</h3>
            <DoughnutChart data={data} />
          </Card>

        </div>
        <div class="col">
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
      </div>





    </>
  );
};

export default ExcelChart;
