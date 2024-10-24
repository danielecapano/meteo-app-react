import { useState, useEffect } from "react";

function Position() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((posizione) => {
      setLat(posizione.coords.lat);
      setLon(posizione.coords.lon);
    });
  }, []);

  return (
    <div>
      <p>Latitudine: {lat}</p>
      <p>Longitudine: {lon}</p>
    </div>
  );
}

export default Position;
