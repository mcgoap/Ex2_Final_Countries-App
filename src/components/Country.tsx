import { useState } from "react";
import { useDispatch } from "react-redux";
import { ICountry } from "../types";
import { addSelected, deleteSelected } from "../store/selectedSlice";

import "./Country.css";

interface Props {
  country: ICountry;
  selectCountry: string;
}

const Country: React.FC<Props> = (props) => {
  const [showCountryInfo, setShowCountryInfo] = useState(false);

  const {
    alpha3Code,
    name,
    flag,
    population,
    region,
    capital,
    borders,
    languages,
    currencies,
  } = props.country;

  const dispatch = useDispatch();

  const selectCountryButton =
    props.selectCountry === "delete" ? "Delete" : "Add to My Selection";

  const newSelectedHandler = () => {
    if (props.selectCountry === "add") {
      dispatch(addSelected(props.country));
    } else {
      dispatch(deleteSelected(props.country.alpha3Code));
    }
  };

  const showInfo = () => {
    setShowCountryInfo((prevShowCountryInfo) => !prevShowCountryInfo);
  };

  return (
    <div className="single-country">
      <div className="country-info">
        <div className="country-flag">
          <img src={flag} alt={alpha3Code} className="img-flag" />
        </div>
        <h2>{name}</h2>
      </div>
      <div className="options">
        <button onClick={newSelectedHandler}>{selectCountryButton}</button>
        <button onClick={showInfo}>
          {!showCountryInfo ? "Show more info" : "Hide"}
        </button>
      </div>

      {showCountryInfo && (
        <div className="country-all-info">
          <h3>
            Capital: <span className="details">{capital}</span>
          </h3>

          <h3>
            Population:{" "}
            <span className="details">
              {population.toLocaleString(undefined)}
            </span>
          </h3>
          <h3>
            Region: <span className="details">{region}</span>
          </h3>

          {languages && (
            <div className="country-list">
              <h3>Languages:</h3>
              <ul>
                {languages.map((language) => (
                  <li key={language.nativeName}>{language.name}</li>
                ))}
              </ul>
            </div>
          )}

          {borders && (
            <div className="country-list">
              <h3>Borders:</h3>
              <ul className="borders">
                {borders.map((border) => (
                  <li key={border}>{border}</li>
                ))}
              </ul>
            </div>
          )}

          {currencies && (
            <div className="country-list">
              <h3>Currencies:</h3>
              <ul>
                {currencies.map((currency) => (
                  <li key={currency.code}>{currency.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Country;
