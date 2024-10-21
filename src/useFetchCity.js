import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://autocomplete.search.hereapi.com/v1/autocomplete";

const fetchCity = async ({ queryKey }) => {
  const search = queryKey[1];
  const res = await axios.get(url, {
    params: {
      q: search,
      apiKey: import.meta.env.VITE_API_KEY_HERE,
      types: "city",
      lang: "it",
      limit: 1,
    },
  });

  if (res.data.length === 0) {
    throw new Error("City not found");
  }
  const city = res.data.items[0].address.city.toLowerCase();

  return city;
};

const useFetchCity = (search) => {
  const { data, error } = useQuery({
    queryKey: ["city", search],
    queryFn: fetchCity,
    enabled: !!search,
  });
  console.log(data);

  return {
    city: data ?? "",
    isError: !!error,
  };
};

export default useFetchCity;
