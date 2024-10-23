import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://autocomplete.search.hereapi.com/v1/autocomplete";
// const url = "https://api.openweathermap.org/geo/1.0/direct?";

const fetchCity = async ({ queryKey }) => {
  const search = queryKey[1];
  // const url = `https://api.tomtom.com/search/2/search/${search}.json`;
  const res = await axios.get(url, {
    params: {
      q: search,
      apiKey: import.meta.env.VITE_API_KEY_HERE,
      // entityTypeSet: "Muncipality",
      // typeahead: true,
      types: "city",
      lang: "it",
      // language: "it-IT",
      limit: 1,
    },
  });

  if (res.data.length === 0) {
    throw new Error("City not found");
  }
  const city = res.data.items[0].address.city.toLowerCase();
  // const { local_names: localName, name } = res.data[0];
  // const city = localName?.it ?? name;
  // const city = res.data.results[0].address.municipality.toLowerCase();

  return city.toLowerCase();
};

const useFetchCity = (search) => {
  const { data, error } = useQuery({
    queryKey: ["city", search],
    queryFn: fetchCity,
    enabled: search.length >= 3,
  });
  console.log(data);

  return {
    city: data ?? "",
    isError: !!error,
  };
};

export default useFetchCity;
