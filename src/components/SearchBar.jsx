import { useState } from "react";
import "./SearchBar.css";
import useFetchCity from "../useFetchCity";

function SearchBar({ inputValue }) {
  const [search, setSearch] = useState("");
  let { city } = useFetchCity(search);
  console.log(city);

  const handleInputChange = (e) => setSearch(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (city) {
      inputValue(city);
      setSearch(city);
      city = "";
      setSearch("");
    } else {
      inputValue(search);
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
          <img
            className='search-icon'
            src='src/assets/icons/search.svg'
            alt='search'
          />
        </button>
      </form>
    </>
  );
}
export default SearchBar;
