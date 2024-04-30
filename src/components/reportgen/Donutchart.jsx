import { AgChartsReact } from 'ag-charts-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';

const Donutchart = () => {

    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState();
    console.log(filteredData)
    const getDatas=async()=>{
        try{
          const res=await axios.get("http://localhost:5000/api/auth/getallreports");
          console.log(res,"get");
          setData(res.data.reports);
          processData();
        }
        catch(error){
          console.log(error);
        }
    }

    useEffect(()=>{
        getDatas();
    },[ ]);

    const processData = () => {
        const processedData = data?.reduce((acc, currentItem) => {
            const existingItemIndex = acc.findIndex(item => item.cardTitle === currentItem.cardTitle);
            if (existingItemIndex !== -1) {
                // If cardTitle already exists, add the price to its total
                acc[existingItemIndex].price += parseInt(currentItem.price);
            } else {
                // If cardTitle doesn't exist, add a new entry
                acc.push({
                    cardTitle: currentItem.cardTitle,
                    price: parseInt(currentItem.price)
                });
            }
        }, []);
        setFilteredData(processedData);
      
    };

    function getData() {
        return [
          { asset: "Stocks", amount: "60000" },
          { asset: "Bonds", amount: 40000 },
          { asset: "Cash", amount: 7000 },
          { asset: "Real Estate", amount: 5000 },
          { asset: "Commodities", amount: 3000 },
        ];
      }
    const [options, setOptions] = useState({
        data: filteredData,
        title: {
          text: "Portfolio Composition",
        },
        series: [
          {
            type: "donut",
            calloutLabelKey: "cardTitle",
            angleKey: "price",
            innerRadiusRatio: 0.7,
          },
        ],
      });
  return (
    <div>
         <AgChartsReact options={options} />
    </div>
  )
}
const root = createRoot(document.getElementById("root"));
root.render(<Donutchart />);


export default Donutchart