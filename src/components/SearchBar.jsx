import { useState } from "react";
import "./SearchBar.css";
import useFetchCity from "../hooks/useFetchCity";
import { useMeteoContext } from "../context";

function SearchBar() {
  const [search, setSearch] = useState("");
  const { onSearch } = useMeteoContext();
  let { city } = useFetchCity(search);
  console.log(city);

  const handleInputChange = (e) => setSearch(e.target.value.toLowerCase());
  const handleSubmit = (e) => {
    e.preventDefault();

    if (city) {
      onSearch(city);
      setSearch(city);
      city = "";
      setSearch("");
    } else {
      onSearch(search);
      setSearch(search);
      city = "";
      setSearch("");
    }
  };

  function viewSuggestions(city, search) {
    return city.startsWith(search) ? city : "";
  }

  return (
    <>
      <form className='search-bar' onSubmit={handleSubmit}>
        <input
          type='text'
          id='search-input'
          value={search}
          onChange={handleInputChange}
          placeholder='Cerca una località'
          autoComplete='off'
          spellCheck='false'
        />
        <div className='suggestions'>{viewSuggestions(city, search)}</div>
        <button>
          <img className='search-icon' src='/icons/search.svg' alt='search' />
        </button>
      </form>
    </>
  );
}
export default SearchBar;
