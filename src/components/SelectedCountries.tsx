import { store } from "../store/store";
import { useSelector } from "../store/store";
import "./SelectedCountries.css";
import CountriesList from "./CountriesList";

const SelectedCountries = () => {
  const countries = store.getState().selected.selected;
  useSelector((state) => state.selected.selected);
  return (
    <section className="selected-countries">
      {countries && countries.length > 0 && (
        <CountriesList countries={countries} selectCountry="delete" />
      )}
      {countries.length === 0 && <p>No selected countries were found</p>}
    </section>
  );
};

export default SelectedCountries;
