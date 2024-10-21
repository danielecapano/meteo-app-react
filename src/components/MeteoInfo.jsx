import { getDate, getTime } from "../utils/utilsFunction";
// import { bg01d, bg01n, bg02d } from "./assets/background";

import "./MeteoInfo.css";

function MeteoInfo({ city, meteoData, onBg }) {
  const { temp, humidity } = meteoData.main;
  const { description, icon } = meteoData.weather[0];
  const { dt: today, timezone } = meteoData;
  const { sunrise, sunset } = meteoData.sys;
  const { speed: wind, deg } = meteoData.wind;
  const windSpeed = (wind * 3.6).toFixed(1);
  const windDirectionStyle = {
    transform: `rotate(${deg}deg)`,
    display: "inline-block",
  };
  onBg(icon);

  console.log(today);

  return (
    <>
      <h1 className='city'>{city}</h1>
      <p className='today'>
        {getDate(today, timezone, true)} {getTime(today, timezone)}
      </p>
      <div className='meteo'>
        <div className='forecast'>
          <div className='temp'>
            <span className='value-temp'>{Math.round(temp)}</span>
            <span className='deg'>&deg;</span>
            <span className='celsius'>c</span>
          </div>
          <span className='clouds'>{description}</span>
        </div>
        <img className='icon' src={`src/assets/icons/${icon}.svg`} alt='icon' />
      </div>
      <div className='info glass'>
        <span className='humidity'>
          <img src='src/assets/icons/humidity.svg' alt='humidity' />
          <p>{humidity}%</p>
        </span>
        <span className='wind'>
          <img src='src/assets/icons/wind.svg' alt='wind' />
          <p className='wind-speed'>
            <span style={windDirectionStyle}>&uarr; </span>
            {windSpeed} km/h
          </p>
        </span>
        <span className='sunrise'>
          <img src='src/assets/icons/sunrise.svg' alt='sunrise' />
          <p>{getTime(sunrise, timezone)}</p>
        </span>
        <span className='sunset'>
          <img src='src/assets/icons/sunset.svg' alt='sunset' />
          <p>{getTime(sunset, timezone)}</p>
        </span>
      </div>
    </>
  );
}

export default MeteoInfo;
