/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";

function PieChart({ followers, following }) {
  const chartRef = useRef(null);

  const formattedData = [
    { name: 'Followers', y:  followers },
    { name: 'Following', y: following},
  ];

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: "pie",
          // width:600,
          // height:400
        },
        title: {
          text: 'Followers/Following',
        },
        plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              },
            },
          },
        series: [
          {
            name: "Followers/Following",
            colorByPoint: true,
            data: formattedData,
          },
        ],
      });
    }
  }, [formattedData]);

  return <div ref={chartRef} style={{borderRadius: "5px",maxWidth:"100%"}}/>;
}

export default PieChart;
