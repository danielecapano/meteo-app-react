import { useEffect, useState } from 'react';
import axios from "axios"

import './App.css';
import SearchBar from './components/SearchBar';
import MeteoInfo from './components/MeteoInfo';
import API_KEY from './API_KEY';

function App() {
  const [search, setSearch] = useState('');
  const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall?';
  const [city, setCity] = useState('');
  const [meteoData, setMeteoData] = useState({});
  const inputValue = (input) => setSearch(input);
const [noResults, setNoResults] = useState(false);
  
  const fetchMeteo = () => {
    
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?`, {
        params: {
            q: search,
            appid: API_KEY,

        }
    }).then(res=> {
      console.log(res);
      if(res.data.length > 0){
        const lat = res.data[0].lat;
        const lon = res.data[0].lon;
        if(res.data[0].local_names && res.data[0].local_names.it) {
            const cityName = res.data[0].local_names.it;
            console.log(cityName);
            setCity(res.data[0].local_names.it);
        } else {
          const cityName = res.data[0].name;
          console.log(cityName);
          setCity(res.data[0].name);
        }
         
        axios.get(BASE_URL, {
            params: {
                appid: API_KEY,
                lat: lat,
                lon: lon,
                units: 'metric',
                lang: 'it',
                
            }
        }).then(res => {
          setMeteoData(res.data);
          console.log(meteoData);
        })
        
        
    } else {
      setNoResults(true);
      setMeteoData({});
    }
  })
};
useEffect(() => {
  if(search) {
    fetchMeteo();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [search]);
  

  return (
    <><section className='main'>
      <div className="container">
        <SearchBar inputValue = {inputValue}/>
        <MeteoInfo city={city} meteoData={meteoData} noResults={noResults}/>
      </div>
    </section>
     
     
      
      
     
    </>
  )
}

export default App
