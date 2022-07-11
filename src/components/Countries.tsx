import React from "react";
import CountriesList from "./CountriesList";
import Select from "react-select";
import { ICountry, Region } from "../types";
import { useState, useEffect } from "react";

import "./Countries.css";

const regions: Region[] = [
  { value: "Africa" },
  { value: "Americas" },
  { value: "Asia" },
  { value: "Europe" },
  { value: "Oceania" },
];

const Countries = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [allCountriesList, setAllCountriesList] = useState<ICountry[]>([]);
  const [error, setError] = useState("");

  const url: string = "https://restcountries.com/v2/all/";

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(url);
        const countries = await response.json();
        if (countries) {
          const countryInfo = countries.map((info: any) => {
            const {
              alpha3Code,
              name,
              capital,
              flag,
              region,
              population,
              languages,
              borders,
              currencies,
            } = info;

            return {
              alpha3Code,
              name,
              capital,
              flag,
              region,
              population,
              languages,
              borders,
              currencies,
            };
          });
          setAllCountriesList(countryInfo);
        } else {
          setAllCountriesList([]);
        }
      } catch (error: any) {
        setError(error);
      }
    }
    fetchCountries();
  }, []);

  const countriesList: ICountry[] = allCountriesList.filter(
    (country) => country.region === selectedRegion
  );
  return (
    <section>
      <section className="selection">
        <Select
          placeholder={"Please select a region of the globe ..."}
          options={regions}
          defaultMenuIsOpen={true}
          getOptionLabel={(regions) => regions.value}
          onChange={(opt) => {
            if (opt != null) {
              setSelectedRegion(opt.value);
            }
          }}
        />
      </section>
      {!error && countriesList.length === 0 && (
        <p>Loading data... Please wait</p>
      )}
      {error && <p>Ops...</p>}
      {selectedRegion && (
        <CountriesList
          countries={countriesList}
          selectedRegion={selectedRegion}
          selectCountry="add"
        />
      )}
    </section>
  );
};

export default Countries;
