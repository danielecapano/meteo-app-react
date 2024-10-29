/* eslint-disable no-global-assign */
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { formattedIsoDate, getSunTimesForDate } from "../utils/utilsFunction";

const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
const meteoUrl = "https://api.open-meteo.com/v1/forecast";

const fetchMeteoData = async ({ queryKey }) => {
  let latitude, longitude, cityName;

  if (!queryKey[1]) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude, longitude);
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  } else {
    const search = queryKey[1];
    const res = await axios.get(geocodingUrl, {
      params: {
        name: search,
        count: 1,
        language: "it",
        format: "json",
      },
    });

    if (res.data.length === 0) {
      throw new Error("City not found");
    }

    ({ latitude, longitude, name } = res.data.results[0]);
    console.log(res.data.results[0]);

    cityName = name;
  }

  const resMeteo = await axios.get(meteoUrl, {
    params: {
      latitude,
      longitude,
      current:
        "temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m",
      hourly: "temperature_2m,weather_code",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
      timezone: "auto",
    },
  });
  const meteo = resMeteo.data.current;
  const meteoCurrent = {
    time: meteo.time,
    temp: meteo.temperature_2m,
    humidity: meteo.relative_humidity_2m,
    code: meteo.weather_code,
    windSpeed: meteo.wind_speed_10m,
    windDirection: meteo.wind_direction_10m,
    isDay: meteo.is_day,
  };
  const currentTime = meteoCurrent.time;

  const meteoDaily = resMeteo.data.daily.time.map((time, index) => {
    const day = resMeteo.data.daily;

    return {
      tempMin: day.temperature_2m_min[index],
      tempMax: day.temperature_2m_max[index],
      sunrise: day.sunrise[index],
      sunset: day.sunset[index],
      time: time,
      code: day.weather_code[index],
    };
  });

  const meteoHourly = resMeteo.data.hourly.time
    .map((time, index) => {
      const hour = resMeteo.data.hourly;
      return {
        temp: hour.temperature_2m[index],
        time: time,
        code: hour.weather_code[index],
      };
    })
    .filter((item) => item.time >= formattedIsoDate(currentTime))
    .slice(0, 24)
    .map((event) => {
      const sunTime = getSunTimesForDate(event.time, meteoDaily);
      const { sunrise, sunset } = sunTime;
      const time = event.time;
      const isDayTime = time >= sunrise && time <= sunset;

      return {
        ...event,
        isDayTime,
      };
    });
  console.log(meteoCurrent);
  console.log(meteoDaily);
  console.log(meteoHourly);

  return {
    cityName,
    currentTime,
    meteoCurrent,
    meteoHourly,
    meteoDaily,
  };
};

const useFetchOpenMeteo = (search) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["meteo", search],
    queryFn: fetchMeteoData,
    // enabled: !!search,
  });

  return {
    city: data?.cityName || "Posizione attuale",
    currentTime: data?.currentTime || "",
    meteoCurrent: data?.meteoCurrent || {},
    meteoHourly: data?.meteoHourly || [],
    meteoDaily: data?.meteoDaily || [],
    isLoading,
    isError: !!error,
  };
};

export default useFetchOpenMeteo;
