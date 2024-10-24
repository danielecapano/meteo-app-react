import { getDate, getTime } from "../utils/utilsFunction";

export default function ForecastInfo({ forecastData }) {
  const items = forecastData.list;
  const timezone = forecastData.city.timezone;
  return (
    <div className='forecast-info'>
      {items.map((item, index) => (
        <div key={index}>
          {getDate(item.dt, timezone, true)} {getTime(item.dt, timezone)} {}
          {Math.round(item.main.temp)}
        </div>
      ))}
    </div>
  );
}
