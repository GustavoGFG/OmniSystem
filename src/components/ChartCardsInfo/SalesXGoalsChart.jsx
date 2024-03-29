import React, { useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
// import Chart from 'react-apexcharts';

const SalesXGoals = ({ props }) => {
  const PL = [];
  for (let i in props.saleArray) {
    PL[i] = `P&L: ${props.saleArray[i] - props.goalArray[i]}`;
  }
  // console.log(PL);
  // defaults.maintainAspectRatio = true;
  // defaults.responsive = true;
  defaults.aspectRatio = 30 / 10;
  // defaults.scales.linear.min = 10000;
  return (
    <div className="overflow-auto">
      <div className="min-h-[300px] min-w-[600px]">
        <Bar
          data={{
            labels: props.goalArray.map((goal, index) => index + 1),
            datasets: [
              {
                label: 'Meta',
                data: props.goalArray.map((goal, index) => goal),
                backgroundColor: '#000',
                borderColor: '#000',
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
                    return `P&L: ${(
                      tooltipItems[1].raw - tooltipItems[0].raw
                    ).toLocaleString('pt-BR', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                    })}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalesXGoals;
