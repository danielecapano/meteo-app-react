/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import useFetchOpenMeteo from "./hooks/useFetchOpenMeteo";

const meteoContext = createContext();

export const MeteoProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const {
    city,
    currentTime,
    meteoCurrent,
    meteoDaily,
    meteoHourly,
    isError,
    isLoading,
  } = useFetchOpenMeteo(query);
  const [bg, setBg] = useState("/background/01d.webp");

  const onSearch = (input) => setQuery(input);
  const handleBg = (bg) => setBg(bg);

  return (
    <meteoContext.Provider
      value={{
        query,
        onSearch,
        city,
        currentTime,
        meteoCurrent,
        meteoDaily,
        meteoHourly,
        isError,
        isLoading,
        bg,
        handleBg,
      }}
    >
      {children}
    </meteoContext.Provider>
  );
};

export const useMeteoContext = () => useContext(meteoContext);
