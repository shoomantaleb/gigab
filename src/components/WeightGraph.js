import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WeightGraph = ({ weights }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (weights && weights.data && weights.timestamps) {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.data.labels = weights.timestamps.map((timestamp) => {
          const date = new Date(timestamp);
          return date.toLocaleDateString(); // Displays just date
        });
        chartRef.current.chart.data.datasets[0].data = weights.data;
        chartRef.current.chart.update(); // Updates chart to reflect changes
      } else if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: weights.timestamps.map((timestamp) => {
              const date = new Date(timestamp);
              return date.toLocaleDateString(); 
            }),
            datasets: [
              {
                label: 'Weight',
                data: weights.data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
              },
            ],
          },
        });
        chartRef.current.chart = newChart; 
      }
    }
  }, [weights]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};


export default WeightGraph;
