import { useMeteoContext } from "../context";
import { getWmoCodes } from "../utils/wmoCodes";
import { getTime, getHour } from "../utils/utilsFunction";

import "./MeteoHurley.css";

export default function MeteoHourly() {
  const { currentTime, meteoDaily, meteoHourly } = useMeteoContext();

  console.log(meteoDaily);
  return (
    <div>
      <div className='forecast-info glass'>
        {meteoHourly.map((hour, index) => (
          <div key={index} className='forecast-hour'>
            <p className='forecast-hour__time'>
              {getHour(currentTime) === getHour(hour.time)
                ? "Ora"
                : getTime(hour.time)}
            </p>
            <p className='forecast-hour__temp'>{Math.round(hour.temp)}&deg;</p>
            <img
              src={getWmoCodes(hour.code, hour.isDayTime).icon}
              alt='icon'
              className='forecast-hour__icon'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
