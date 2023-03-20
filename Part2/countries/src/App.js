import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);
  const baseUrl = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(baseUrl).then((response) => setCountries(response.data));
  }, []);

  const filterCountries = (event) => {
    setCountryInfo(null);
    const searchInput = event.target.value;
    if (searchInput) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filtered);
      if (filtered.length === 1) {
        setCountryInfo(filtered[0]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const countryRender = () => {
    if (searchResults.length > 10) {
      return <p>Too many matches, please type more symbols</p>;
    } else if (searchResults.length < 11 && searchResults.length > 1) {
      return searchResults.map((country) => (
        <div className="country_item" key={country.name.common}>
          {country.name.common}
          <button
            className="show"
            onClick={() => {
              setCountryInfo(
                countries.find((c) => c.name.common === country.name.common)
              );
            }}
          >
            show
          </button>
        </div>
      ));
    } else {
      return null;
    }
  };

  return (
    <div>
      find countries <input type="text" onChange={filterCountries} />
      {countryInfo ? (
        <div>
          <h2>{countryInfo.name.common}</h2>
          <p>Capital: {countryInfo.capital}</p>
          <p>Area: {countryInfo.area}</p>
          <p>Population: {countryInfo.population}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(countryInfo.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            width={250}
            src={`${countryInfo.flags.svg}`}
            alt={`${countryInfo.flags.alt}`}
          ></img>
        </div>
      ) : (
        countryRender()
      )}
    </div>
  );
}

export default App;
