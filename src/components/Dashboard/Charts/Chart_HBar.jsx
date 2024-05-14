// import { transformToCurrency } from '@/utils/utils';
// import React, { useState } from 'react';
// import Chart from 'react-apexcharts';

// const Chart_HBar = ({ props }) => {
//   console.log(props.staffInfo);
//   if (props.typeOfData === 'Ticket') {
//     const topAverageTickets = props.staffInfo
//       .sort((staff1, staff2) => {
//         return staff2.average_ticket - staff1.average_ticket;
//         // return staff2.averageTicket - staff1.averageTicket;
//       })
//       .slice(0, 5);
//     // var xData = topAverageTickets.map(item => item.averageTicket);
//     var xData = topAverageTickets.map(item => item.average_ticket.toFixed(2));
//     // var yData = topAverageTickets.map(item => `${item.id}-${item.name}`);
//     var yData = topAverageTickets.map(item => `${item.id}-${item.full_name}`);
//   }
//   if (props.typeOfData === 'Mistake') {
//     const topAverageShortage = props.staffInfo
//       .sort((staff1, staff2) => {
//         return staff1.averageMistake - staff2.averageMistake;
//         // return staff1.averageShortage - staff2.averageShortage;
//       })
//       .slice(0, 5);
//     var xData = topAverageShortage.map(item => item.averageMistake);
//     // var xData = topAverageShortage.map(item => item.averageShortage);
//     var yData = topAverageShortage.map(item => `${item.id}-${item.full_name}`);
//     // var yData = topAverageShortage.map(item => `${item.id}-${item.name}`);
//   }

//   const [data, setData] = useState({
//     options: {
//       chart: {
//         type: 'bar',
//         toolbar: {
//           show: false,
//         },
//       },
//       colors: props.color,
//       plotOptions: {
//         bar: {
//           horizontal: true,
//         },
//       },
//       series: [
//         {
//           name: '',

//           data: xData,
//         },
//       ],
//       yaxis: {
//         // reversed: props.reversed,
//         decimalInFloat: 2,
//       },
//       xaxis: {
//         categories: yData,
//         decimalInFloat: 2,
//       },
//     },
//   });

//   return (
//     <div className="flex h-full justify-center items-center">
//       <Chart
//         options={data.options}
//         series={data.options.series}
//         type={data.options.chart.type}
//         // height={data.options.chart.height}
//       />
//     </div>
//   );
// };

// export default Chart_HBar;
import { transformToCurrency } from '@/utils/utils';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Chart_HBar = ({ props }) => {
  const [data, setData] = useState({
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: props.color,
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontWeight: 500,
          colors: ['#000'],
        },
      },
      series: [{ data: [] }],
      yaxis: {
        labels: {
          show: false,
        },
      },
      xaxis: {
        categories: [],
      },
      // tooltip: {
      //   enabled: false,
      // },

      // tooltip: {
      //   enabled: true,
      //   custom: function ({ series, seriesIndex, dataPointIndex }) {
      //     const employeeInfo = props.staffInfo[dataPointIndex];
      //     const value =
      //       props.typeOfData === 'Ticket' ? 'Average Ticket' : 'Mistake Value';
      //     return `
      //       <div style='display: flex; flex-direction:column; background:white; text-align: center'>
      //         <span style='background: rgba(0,0,0,0.05); padding: 5px 8px'>${employeeInfo.id} - ${employeeInfo.full_name}</span>

      //         <span style='font-weight: bold; padding: 4px'>${transformToCurrency(series[seriesIndex][dataPointIndex])}</span>
      //       </div>
      //     `;
      //   },
      // },
    },
  });

  useEffect(() => {
    if (props.staffInfo && props.typeOfData) {
      let sortedData = [];

      if (props.typeOfData === 'Ticket') {
        sortedData = props.staffInfo
          .sort((a, b) => b.average_ticket - a.average_ticket)
          .slice(0, 5)
          .map(item => item.average_ticket.toFixed(2));
      } else if (props.typeOfData === 'Mistake') {
        sortedData = props.staffInfo
          .sort((a, b) => a.averageMistake - b.averageMistake)
          .slice(0, 5)
          .map(item => item.averageMistake.toFixed(2));
      }

      const yData = props.staffInfo
        .slice(0, 5)
        .map(item => `${item.id}-${item.full_name}`);

      setData({
        ...data,
        options: {
          ...data.options,
          series: [{ data: sortedData }],
          xaxis: {
            ...data.options.xaxis,
            categories: yData,
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex }) {
              const employeeInfo = props.staffInfo[dataPointIndex];
              const value =
                props.typeOfData === 'Ticket'
                  ? 'Average Ticket'
                  : 'Mistake Value';
              return `
                <div style='display: flex; flex-direction:column; background:rgba(0,0,0,0.8); text-align: center; font-size: 12px; border:none'>
                  <span style='color: white; font-weight:bold;padding: 5px 8px'>${employeeInfo.id} - ${employeeInfo.full_name}</span>
                  
                  <span style='color:white;font-weight: bold; padding: 4px'>${transformToCurrency(series[seriesIndex][dataPointIndex])}</span>
                </div>
              `;
            },
          },
        },
      });
    }
  }, [props.staffInfo, props.typeOfData]);

  return (
    <div className="flex justify-center items-center h-full">
      {props.staffInfo.length > 0 && (
        <Chart
          options={data.options}
          series={data.options.series}
          type={data.options.chart.type}
        />
      )}
      {props.staffInfo.length == 0 && (
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

export default Chart_HBar;
