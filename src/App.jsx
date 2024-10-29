import "./App.css";
import SearchBar from "./components/SearchBar";
import MeteoCurrent from "./components/MeteoCurrent";

import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import { useMeteoContext } from "./context";
import MeteoHourly from "./components/MeteoHourly";

function App() {
  const { bg, isError, isLoading } = useMeteoContext();

  return (
    <>
      <section
        className='main'
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className='container'>
          <SearchBar />
          <section>
            {isLoading && !isError ? (
              <Loading />
            ) : !isLoading && isError ? (
              <NotFound />
            ) : (
              <MeteoCurrent />
            )}
            {!isLoading && !isError && <MeteoHourly />}
          </section>
        </div>
      </section>
    </>
  );
}

export default App;
