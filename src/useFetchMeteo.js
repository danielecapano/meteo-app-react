import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct?";
const meteoUrl = "https://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";

const fetchMeteoData = async ({ queryKey }) => {
  const search = queryKey[1];
  const res = await axios.get(geocodingUrl, {
    params: {
      q: search,
      appid: import.meta.env.VITE_API_KEY,
    },
  });
  if (res.data.length === 0) {
    throw new Error("City not found");
  }

  const { lat, lon, local_names: localName, name } = res.data[0];
  const cityName = localName?.it ?? name;

  const [meteoResponse, forecastResponse] = await Promise.all([
    axios.get(meteoUrl, {
      params: {
        lat,
        lon,
        appid: import.meta.env.VITE_API_KEY,
        units: "metric",
        lang: "it",
      },
    }),
    axios.get(forecastUrl, {
      params: {
        lat,
        lon,
        appid: import.meta.env.VITE_API_KEY,
        units: "metric",
        lang: "it",
      },
    }),
  ]);

  return {
    cityName,
    meteoData: meteoResponse.data,
    forecastData: forecastResponse.data,
  };
};

const useFetchMeteo = (search) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["meteo", search],
    queryFn: fetchMeteoData,
    enabled: !!search,
  });

  return {
    city: data?.cityName || "",
    meteoData: data?.meteoData || {},
    forecastData: data?.forecastData || {},
    isLoading,
    isError: !!error,
  };
};

export default useFetchMeteo;
