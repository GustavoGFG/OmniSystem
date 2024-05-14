import React, { useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { transformToCurrency } from '@/utils/utils';
import { useEffect } from 'react';
// import Chart from 'react-apexcharts';

const Chart_AreaLine = ({ props }) => {
  // console.log('SALE: ', props.saleArray);
  // console.log('GOALS: ', props.saleGoal);
  const PL = [];
  for (let i in props.saleArray) {
    PL[i] = `P&L: ${props.saleArray[i] - props.goalArray[i]}`;
  }
  // console.log(PL);
  // defaults.maintainAspectRatio = true;
  // defaults.responsive = true;
  defaults.aspectRatio = 30 / 10;
  // defaults.scales.linear.min = 10000;
  const [options, setOptions] = useState({
    maintainAspectRatio: false,
    scales: {
      y: {
        grace: '5%',
        min: 12000,
        // max: 24000,
        ticks: {
          format: {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          },
          stepSize: 3000,
          color: '#333', // Change tick color for better contrast
        },
        grid: {
          color: '#ccc', // Change grid color for better visibility
        },
      },
      x: {
        grid: {
          display: false, // Disable x-axis grid lines for cleaner appearance
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          footer: function (tooltipItems) {
            return `P&L: ${transformToCurrency(
              tooltipItems[1].raw - tooltipItems[0].raw
            )}`;
          },
        },
      },
    },
  });
  useEffect(() => {
    setOptions({
      maintainAspectRatio: false,
      scales: {
        y: {
          grace: '5%',
          min: 12000,
          // max: 24000,
          ticks: {
            format: {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            },
            stepSize: 3000,
            color: '#333', // Change tick color for better contrast
          },
          grid: {
            color: '#ccc', // Change grid color for better visibility
          },
        },
        x: {
          grid: {
            display: false, // Disable x-axis grid lines for cleaner appearance
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            footer: function (tooltipItems, goal) {
              return `P&L: ${tooltipItems[0].raw}`;
            },
            // footer: function (tooltipItems) {
            //   return `P&L: tooltipItems`;
            //   // ${transformToCurrency(
            //   //   tooltipItems[1].raw - tooltipItems[0].raw
            //   // )}`;
            // },
          },
        },
      },
    });
  }, [props]);
  return (
    <div className="overflow-auto">
      <div className="min-h-[300px] min-w-[600px] flex justify-center items-center">
        {props.saleArray.length == 0 && (
          <div
            className="chart-skeleton animate-pulse"
            style={{
              width: '200px',
              height: '200px',
              background: `url("../../../chart-skeleton.png") center center no-repeat`,
            }}
          />
        )}

        {/* <Bar
          data={{
            labels: props.goalArray.map((goal, index) => index + 1),
            datasets: [
              {
                fill: 'origin',
                label: 'Meta',
                data: props.goalArray.map((goal, index) => goal),
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderColor: 'rgba(0,0,0,0.8)',
                type: 'line',
              },
              {
                label: 'Venda',
                data: props.saleArray.map((sale, index) => sale),
                backgroundColor: '#007041',
                borderColor: '#000',
                type: 'bar',
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            y: {
              grace: '5%',
              min: 12000,
              // max: 24000,
              ticks: {
                format: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
                stepSize: 3000,
              },
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            plugins: {
              tooltip: {
                callbacks: {
                  footer: function (tooltipItems) {
                    return `P&L: ${transformToCurrency(
                      tooltipItems[1].raw - tooltipItems[0].raw
                    )}`;
                  },
                },
              },
            },
          }}
        /> */}
        {props.saleArray.length > 0 && (
          <Bar
            data={{
              labels: props.goalArray.map((goal, index) => index + 1),
              datasets: [
                {
                  fill: 'origin',
                  label: 'Meta',
                  data: props.goalArray.map((goal, index) => goal),
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change the background color to make it lighter
                  borderColor: '#000',
                  borderWidth: 2, // Increase border width for better visibility
                  type: 'line',
                  order: 2, // Draw the line dataset on top of bar dataset,
                },
                {
                  label: 'Venda',
                  data: props.saleArray.map((sale, index) => sale),
                  backgroundColor: '#007041',
                  borderColor: '#000',
                  borderWidth: 1, // Add border to bars for better visibility
                  borderRadius: 4, // Add border radius to make bars more rounded
                  type: 'bar',
                  order: 1, // Draw the bar dataset below line dataset
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              y: {
                grace: '5%',
                min: 12000,
                // max: 24000,
                ticks: {
                  format: {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  },
                  stepSize: 3000,
                },
              },
              interaction: {
                intersect: false,
                mode: 'index',
              },
              plugins: {
                tooltip: {
                  borderColor: 'rgba(0,0,0,0.15',
                  borderWidth: 1,
                  displayColors: false,
                  // backgroundColor: '#fff',
                  // titleColor: '#000',
                  titleAlign: 'center',
                  // bodyColor: '#000',
                  // footerColor: '#000',
                  titleMarginBottom: 10,

                  callbacks: {
                    label: function () {
                      return '';
                    },
                    title: function (tooltipItems) {
                      return `P&L:    ${transformToCurrency(
                        tooltipItems[0].raw - tooltipItems[1].raw
                      )}`;
                    },
                    footer: function (tooltipItems) {
                      return `Venda:  ${transformToCurrency(tooltipItems[0].raw)}\nMeta:    ${transformToCurrency(tooltipItems[1].raw)}`;
                    },
                    // footer: function (tooltipItems) {
                    //   return `Venda:  ${transformToCurrency(tooltipItems[0].raw)}\nMeta:    ${transformToCurrency(tooltipItems[1].raw)}`;
                    // },
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chart_AreaLine;
