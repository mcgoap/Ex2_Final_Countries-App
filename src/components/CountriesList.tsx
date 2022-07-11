import { useEffect, useState } from "react";
import Country from "./Country";
import { ICountry } from "../types";
import "./CountriesList.css";

interface Props {
  countries: ICountry[];
  selectedRegion?: string;
  selectCountry: string;
}

const CountriesList: React.FC<Props> = (props) => {
  const { countries, selectedRegion, selectCountry } = props;
  let searchRegion = selectedRegion;
  const [searchedKw, setSearchedKw] = useState("");
  //if user change region -> then reconsider search
  useEffect(() => {
    setSearchedKw("");
  }, [searchRegion]);

  //get input.value and set it to setSearchedKW
  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const searchedTerm = (e.target as HTMLInputElement).value;
    setSearchedKw(searchedTerm);
  };

  let foundCountries = [];

  return (
    <>
      <section className="search-form">
        <input
          type="search"
          value={searchedKw}
          onChange={searchHandler}
          className="input"
          placeholder=" 🔍 Search a specfic country:"
        />
      </section>
      <section className="countries-list">
        {
          <div className="list-container">
            {countries &&
              countries.length > 0 &&
              (foundCountries = countries
                .filter((country) => {
                  return (
                    searchedKw === "" ||
                    country.name
                      .toLowerCase()
                      .startsWith(searchedKw.toLowerCase())
                  );
                })
                .map((country) => (
                  <li key={country.alpha3Code} className="countries-list">
                    <Country country={country} selectCountry={selectCountry} />
                  </li>
                )))}

            {foundCountries.length === 0 && <h2>Not Found!</h2>}
          </div>
        }
      </section>
    </>
  );
};

export default CountriesList;
