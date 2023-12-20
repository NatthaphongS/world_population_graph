import { Data } from './data.js';

const makedata = (year1) => {
  const newDatas = [];
  // add color to country
  // Data.map(el=>)
  // filter by year
  Data?.map((el) => {
    if (
      el.Year == year1 &&
      !el.Country_name.includes('Less') &&
      !el.Country_name.includes('Upper') &&
      !el.Country_name.includes('(') &&
      !el.Country_name.includes('High') &&
      !el.Country_name.includes('Low') &&
      !el.Country_name.includes('Least') &&
      !el.Country_name.includes('More')
    ) {
      newDatas.push(el);
    }
  });
  newDatas.sort((a, b) => b.Population - a.Population);
  const result = newDatas.slice(1, 15);
  // console.log(result);
  return result;
};

export default makedata;
