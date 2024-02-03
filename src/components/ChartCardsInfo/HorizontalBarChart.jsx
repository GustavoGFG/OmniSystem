import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const HorizontalBarChart = ({ props }) => {
  if (props.typeOfData === 'Ticket') {
    const topAverageTickets = props.staffInfo
      .sort((staff1, staff2) => {
        return staff2.averageTicket - staff1.averageTicket;
      })
      .slice(0, 5);
    var xData = topAverageTickets.map(item => item.averageTicket);
    var yData = topAverageTickets.map(item => `${item.id}-${item.name}`);
  }
  if (props.typeOfData === 'Mistake') {
    const topAverageShortage = props.staffInfo
      .sort((staff1, staff2) => {
        return staff1.averageShortage - staff2.averageShortage;
      })
      .slice(0, 5);
    var xData = topAverageShortage.map(item => item.averageShortage);
    var yData = topAverageShortage.map(item => `${item.id}-${item.name}`);
  }

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
        },
      },
      series: [
        {
          name: '',

          data: xData,
        },
      ],
      yaxis: {
        // reversed: props.reversed,
        decimalInFloat: 2,
      },
      xaxis: {
        categories: yData,
        decimalInFloat: 2,
      },
    },
  });

  return (
    <div className="flex h-full justify-center items-center">
      <Chart
        options={data.options}
        series={data.options.series}
        type={data.options.chart.type}
        // height={data.options.chart.height}
      />
    </div>
  );
};

export default HorizontalBarChart;
