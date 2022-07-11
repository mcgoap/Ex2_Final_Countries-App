import React from "react";
import "./App.css";
import Countries from "./components/Countries";
import SelectedCountries from "./components/SelectedCountries";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>Countries App </p>
        </header>
        <div className="container">
          <Countries />
        </div>
        <SelectedCountries />
      </div>
    </>
  );
};

export default App;
