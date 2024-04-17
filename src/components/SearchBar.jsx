
import { useState } from "react";
import './SearchBar.css';

function SearchBar({inputValue}) {
    const [search, setSearch] = useState('');
    
    // let lat = '';
    // let lon = '';
    const handleInputChange = (e) => setSearch(e.target.value);
    const handleInput = () => setSearch('');
    const handleClick = () => inputValue(search);
    
    
    
    return(
        <>
       <div className="search-bar">
            <input type="text" id="search-input"
            value={search}
            onChange={handleInputChange}
            onClick={handleInput}
            placeholder="Cerca una località"/>
            <button onClick={handleClick}>
                <img className="search-icon" src="src/assets/icons/search.svg" alt="search" />
            </button>
       </div>
        </>
    )
}
export default SearchBar