import { AgChartsReact } from 'ag-charts-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';

const Donutchart = () => {

    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const totalAmount = totalPrice.toString();
    console.log(totalAmount, "total");
    const getDatas = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/getallreports");
            console.log(res.data.reports, "get");

            if (res.data && Array.isArray(res.data.reports)) {
                // If res.data.reports is not undefined and is an array
                setData(res.data.reports);
    
                const processedData = res.data.reports.reduce((acc, currentItem) => {
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
                    return acc;
                }, []);
                setFilteredData(processedData);
                const total = processedData.reduce((acc, currentItem) => acc + currentItem.price, 0);
                setTotalPrice(total);
            } else {
                console.log("Data is undefined or not an array.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(()=>{
        getDatas();
    },[ ]);

    // const processData = () => {
    //     const processedData = data.reduce((acc, currentItem) => {
    //         const existingItemIndex = acc.findIndex(item => item.cardTitle === currentItem.cardTitle);
    //         if (existingItemIndex !== -1) {
    //             // If cardTitle already exists, add the price to its total
    //             acc[existingItemIndex].price += parseInt(currentItem.price);
    //         } else {
    //             // If cardTitle doesn't exist, add a new entry
    //             acc.push({
    //                 cardTitle: currentItem.cardTitle,
    //                 price: parseInt(currentItem.price)
    //             });
    //         }
    //         return acc;
    //     }, []);
    //     // console.log(processedData)
    //     return processedData;
    // };

    // function getData() {
    //     return [
    //       { asset: "Stocks", amount: "60000" },
    //       { asset: "Bonds", amount: 40000 },
    //       { asset: "Cash", amount: 7000 },
    //       { asset: "Real Estate", amount: 5000 },
    //       { asset: "Commodities", amount: 3000 },
    //     ];
    //   }
    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            data: filteredData,
            series: [
                {
                    ...prevOptions.series[0],
                    innerLabels: [
                        {
                            text: "Total amount",
                            fontWeight: "bold",
                        },
                        {
                            text: `${totalPrice}`, // Format the total amount
                            margin: 4,
                            fontSize: 48,
                            color: "green",
                        },
                    ],
                },
            ],
        }));
    }, [filteredData,totalPrice]);

    const [options, setOptions] = useState({
        data: filteredData,
        title: {
          text: "Revenue Report",
        },
        series: [
          {
            type: "donut",
            calloutLabelKey: "cardTitle",
            angleKey: "price",
            innerRadiusRatio: 0.7,
            innerLabels: [
                {
                  text: "Total amount",
                  fontWeight: "bold",
                },
                {
                  text: totalAmount,
                  margin: 4,
                  fontSize: 48,
                  color: "green",
                },
              ],
          },
          
        ],
      });
      console.log(options, "options")
  return (
    <div style={{height:"600px"}}>
         <AgChartsReact options={options}  />
    </div>
  )
}
const root = createRoot(document.getElementById("root"));
root.render(<Donutchart />);


export default Donutchart