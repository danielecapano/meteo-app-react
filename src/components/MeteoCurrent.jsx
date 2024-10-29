/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useMeteoContext } from "../context";
import { getDate, getTime } from "../utils/utilsFunction";
import { BsThermometerLow } from "react-icons/bs";
import { BsThermometerHigh } from "react-icons/bs";

import "./MeteoInfo.css";
import { getWmoCodes } from "../utils/wmoCodes";

export default function MeteoCurrent() {
  const { city, meteoCurrent, meteoDaily, handleBg } = useMeteoContext();

  const {
    time: today,
    code,
    humidity,
    isDay,
    temp,
    windDirection,
    windSpeed,
  } = meteoCurrent;
  const windDirectionStyle = {
    transform: `rotate(${windDirection - 90}deg)`,
    display: "inline-block",
  };
  console.log(getWmoCodes(code, isDay).icon);

  const { sunrise, sunset, tempMin, tempMax } = meteoDaily[0];

  useEffect(() => {
    handleBg(getWmoCodes(code, isDay).bg);
  }, []);

  console.log(today);

  return (
    <>
      <h1 className='city'>{city}</h1>
      <p className='today'>
        {getDate(today, true)} {getTime(today)}
      </p>
      <div className='meteo'>
        <div className='forecast'>
          <div className='temp'>
            <span className='value-temp'>{Math.round(temp)}</span>
            <span className='deg'>&deg;</span>
            <span className='celsius'>c</span>
          </div>
        </div>
        <img className='icon' src={getWmoCodes(code, isDay).icon} alt='icon' />
        <div className='min-max glass'>
          <span className='min-max__temp'>
            <BsThermometerLow />
            {Math.round(tempMin)}&deg;
          </span>
          <span className='min-max__temp'>
            <BsThermometerHigh />
            {Math.round(tempMax)}&deg;
          </span>
        </div>
        <span className='clouds'>{getWmoCodes(code, isDay).description}</span>
      </div>
      <div className='info glass'>
        <span className='humidity'>
          <img src='/icons/humidity.svg' alt='humidity' />
          <p>{humidity}%</p>
        </span>
        <span className='wind'>
          <img src='/icons/wind.svg' alt='wind' />
          <p className='wind-speed'>
            <span style={windDirectionStyle}>&#10148; </span>
            {windSpeed} km/h
          </p>
        </span>
        <span className='sunrise'>
          <img src='/icons/sunrise.svg' alt='sunrise' />
          <p>{getTime(sunrise)}</p>
        </span>
        <span className='sunset'>
          <img src='/icons/sunset.svg' alt='sunset' />
          <p>{getTime(sunset)}</p>
        </span>
      </div>
    </>
  );
}
