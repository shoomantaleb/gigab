import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WeightGraph = ({ weights }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.data.labels = weights.map((_, index) => `Day ${index + 1}`);
      chartRef.current.chart.data.datasets[0].data = weights;
      chartRef.current.chart.update(); // Update the chart to reflect the changes
    } else if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: weights.map((_, index) => `Day ${index + 1}`),
          datasets: [
            {
              label: 'Weight',
              data: weights,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        },
      });
      chartRef.current.chart = newChart; 
    }
  }, [weights]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};


export default WeightGraph;
