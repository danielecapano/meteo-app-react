import { useState } from "react";

import "./App.css";
import SearchBar from "./components/SearchBar";
import MeteoInfo from "./components/MeteoInfo";
import useFetchMeteo from "./useFetchMeteo";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import ForecastInfo from "./components/ForecastInfo";
import Position from "./components/Position";

function App() {
  const [search, setSearch] = useState("");
  const { city, meteoData, forecastData, isError, isLoading } =
    useFetchMeteo(search);
  const [bg, setBg] = useState("01d");

  const inputValue = (input) => setSearch(input);
  const handleBg = (bg) => setBg(bg);

  console.log(forecastData);

  return (
    <>
      <section
        className='main'
        style={{
          backgroundImage: `url("/background/${bg}.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className='container'>
          <SearchBar inputValue={inputValue} />
          <section>
            {isLoading && !isError ? (
              <Loading />
            ) : !isLoading && isError ? (
              <NotFound />
            ) : (
              <MeteoInfo city={city} meteoData={meteoData} onBg={handleBg} />
            )}
            {/* {!isLoading && !isError && (
              <ForecastInfo forecastData={forecastData} />
            )} */}
            <Position />
          </section>
        </div>
      </section>
    </>
  );
}

export default App;
