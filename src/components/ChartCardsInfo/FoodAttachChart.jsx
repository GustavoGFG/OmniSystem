import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const FoodAttachChart = ({ props }) => {
  const defaultOptions = {
    options: {
      chart: {
        height: 'auto',
        redrawOnParentResize: true,

        // padding: 0,
        // margin: 0,
        type: 'radialBar',
      },
      series: [(props.foodAttach * 100).toFixed(0)],
      labels: ['Progress'],
      stroke: {
        lineCap: 'round',
      },
      fill: {
        colors: '#007041',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '65%',
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            showOn: 'always',
            name: {
              offsetY: -5,
              show: true,
              color: '#3c1c08',
              fontSize: '13px',
            },
            value: {
              color:
                props.foodAttach >= props.reference ? '#007041' : '#ef4444',
              fontSize: '25px',
              show: true,
              fontWeight: 500,
            },
          },
        },
      },
    },
  };

  const [data, setData] = useState(defaultOptions);

  useEffect(() => {
    setData(defaultOptions);
  }, [props.foodAttach]);

  return (
    <div className="flex h-full justify-center items-center">
      <Chart
        id="yourChartId"
        options={data.options}
        series={data.options.series}
        type={data.options.chart.type}
        height={data.options.chart.height}
      />
    </div>
  );
};

export default FoodAttachChart;
