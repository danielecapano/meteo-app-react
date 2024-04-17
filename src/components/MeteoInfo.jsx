import './MeteoInfo.css';

function MeteoInfo({city, meteoData, noResults}) {
  const isEmptyObject = (obj) => Object.keys(obj).length === 0;
  
  if(!isEmptyObject(meteoData)) {
    const {temp, humidity, wind_speed, sunrise, sunset, dt: today} = meteoData.current;
    const {description, icon} = meteoData.current.weather[0];
    const {dt} = meteoData.daily[0];
    
    const convertTime = (unixTimeStamp) => {
      const date = new Date(unixTimeStamp * 1000);
      const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
      const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
      const timeFormatted = `${hours}:${minutes}`;
      return timeFormatted;
    };
    
    const convertDate = (unixTimeStamp) => {
      const date = new Date(unixTimeStamp * 1000);
      const month = (date.getMonth() < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
      const dateFormatted = `${day}/${month}`;
      return dateFormatted;
    };
    
    return (
      <>
        <h1 className="city">{city}</h1>
        <div className="meteo">
          <img className='icon' src={`src/assets/icons/${icon}.svg`} alt="icon" />
          <div className='forecast'>
            <span className='temp'>{Math.round(temp)}&deg;</span>
            <span className='clouds'>{description}</span>
          </div>
        </div>
        <div className="info">
          <span className="humidity">
            <img src="src/assets/icons/humidity.svg" alt="humidity" />
            <p>{humidity}%</p>
          </span>
          <span className="wind">
            <img src="src/assets/icons/wind.svg" alt="wind" />
            <p>{wind_speed} km/h</p>
          </span>
          <span className="sunrise">
            <img src="src/assets/icons/sunrise.svg" alt="sunrise" />
            <p>{convertTime(sunrise)}</p>
          </span>
          <span className="sunset">
            <img src="src/assets/icons/sunset.svg" alt="sunset" />
            <p>{convertTime(sunset)}</p>
          </span>
        </div>
       
        <p>{convertDate(today)}</p>
        <p>{convertDate(dt)}</p>
      </>
    );
  } else if(noResults) {
    return (
      <>
        <p>Nessun risultato trovato</p>
      </>
    );
  }
  return null; // Se meteoData è vuoto, non restituisce nulla
}

export default MeteoInfo