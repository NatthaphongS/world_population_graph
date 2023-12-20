import { Bar } from 'react-chartjs-2';
import { styled } from 'styled-components';

const ChartContainer = styled.div`
  height: 100%;
  padding: 30px 10px;
`;

export default function BarChart({ chartData }) {
  return (
    <ChartContainer>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
              text: 'Users Gained between 2016-2020',
            },
            legend: {
              display: false,
            },
          },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 3,
            },
          },
          responsive: true,
          scales: {
            x: {
              ticks: {
                stepSize: 200000000,
              },
              max: chartData.datasets[0].data[0],
              position: 'top',
            },
            y: {
              ticks: {
                crossAlign: 'far',
                align: 'center',
              },
            },
          },
        }}
      />
    </ChartContainer>
  );
}
