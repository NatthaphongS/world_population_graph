import { styled } from 'styled-components';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useEffect, useState } from 'react';
import BarChart from './components/BarChart';
import { Data } from '../utils/data';
import makedata from '../utils/makedata';

const Contianer = styled.div`
  height: 800px;
  margin: 20px;
  position: relative;
  min-width: 650px;
`;
const WorldDataContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 60px;
  display: flex;
  flex-flow: column;
  align-items: end;
  padding-bottom: 30px;
  z-index: 50;
  color: gray;
  h1 {
    font-size: 80px;
  }
`;

Chart.register(CategoryScale);

const worldDatas = Data.filter((el) => el.Country_name == 'World');

function stringToColor(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = (hash & 0x00ffffff).toString(16).toUpperCase();

  return `#${'00000'.substring(0, 6 - color.length)}${color}`;
}

function App() {
  const [year, setYear] = useState(1950);
  const [worldData, setWorldData] = useState(
    worldDatas.find((el) => el.Year == 1950)
  );
  const [chartData, setChartData] = useState({
    labels: makedata(1950)?.map((data) => data.Country_name),
    datasets: [
      {
        label: 'Users Gained ',
        data: makedata(1950)?.map((data) => data.Population),
        backgroundColor: makedata(1950)?.map((data) =>
          stringToColor(data.Country_name)
        ),
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  });

  const updateYear = () => {
    setChartData({
      labels: makedata(year)?.map((data) => data.Country_name),
      datasets: [
        {
          label: 'Users Gained ',
          data: makedata(year)?.map((data) => data.Population),
          backgroundColor: makedata(year)?.map((data) =>
            stringToColor(data.Country_name)
          ),
          borderColor: 'black',
          borderWidth: 1,
          // barThickness: 50,
        },
      ],
    });
    setWorldData(worldDatas.find((el) => el.Year == year));
    setYear((prev) => (prev == 2021 ? 1950 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(updateYear, 400);
    return () => clearInterval(interval);
  }, [year]);

  return (
    <Contianer>
      <h1>Population growth per contry, 1950 to 2021</h1>
      <BarChart chartData={chartData} />
      <WorldDataContainer>
        <h1>{year}</h1>
        <h2>Total :{new Intl.NumberFormat().format(worldData.Population)}</h2>
      </WorldDataContainer>
    </Contianer>
  );
}

export default App;
