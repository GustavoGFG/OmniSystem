import { RiDonutChartLine } from '@remixicon/react';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Chart_RBar = ({ props }) => {
  const defaultOptions = {
    options: {
      chart: {
        height: 'auto',
        redrawOnParentResize: true,

        // padding: 0,
        // margin: 0,
        type: 'radialBar',
      },
      series: props.foodAttach ? [(props.foodAttach * 100).toFixed(0)] : 0,

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
              show: false,
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
      {props.foodAttach && (
        <Chart
          id="yourChartId"
          options={data.options}
          series={data.options.series}
          type={data.options.chart.type}
          height={data.options.chart.height}
        />
      )}
      {!props.foodAttach && (
        <div
          className="chart-skeleton animate-pulse"
          style={{
            width: '200px',
            height: '200px',
            background: `url("../../../chart-skeleton.png") center center no-repeat`,
          }}
        />
      )}
    </div>
  );
};

export default Chart_RBar;
