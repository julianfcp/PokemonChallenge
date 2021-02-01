import React, { useState, useEffect } from "react";
import axios from "axios";
import Noresults from "./components/Noresults";
import Pokemon from "./components/Pokemon";
import "./App.css";

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

function App() {
  // State Variables
  const [checkBox, setCheckBox] = useState(false);
  const [dCheck, setDCheck] = useState(true);
  const [userData, setUserData] = useState({});
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState({});
  // UseEffect hook loads the pokemon list
  useEffect(() => {
    getPokemonJson();
  }, []);
  // Axios to fetch de list from the url
  const getPokemonJson = async () => {
    const response = await axios.get(URL_PATH);
    setUserData(response.data);
  };
  // This method handles the checkbox when toggle
  const handleOnClick = async () => {
    if (checkBox === true) {
      setCheckBox(false);
    } else {
      setCheckBox(true);
      if (userInput) {
        sortMaxCP();
      }
    }
  };
  //This is the main method, the list is dynamic when user starts writing
  const handleOnInput = async (e) => {
    if (e.target.value.length === 0) {
      //variables cleared
      setResults({});
      setDCheck(true);
    } else {
      //filter and sort
      setUserInput(e.target.value);
      setDCheck(false);
      await setResults(
        userData.filter(
          (item) =>
            item.Name.includes(e.target.value) ||
            item.Types.includes(e.target.value)
        )
      );
      if (checkBox) {
        sortMaxCP();
      }
    }
  };
  // This method is use to sort the list when the checkbox is toggled on
  const sortMaxCP = () => {
    if (results.length !== undefined) {
      results.sort(function (a, b) {
        return parseInt(a.MaxCP) - parseInt(b.MaxCP);
      });
    }
  };

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input
          type="checkbox"
          id="maxCP"
          onClick={handleOnClick}
          disabled={dCheck}
        />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        onInput={handleOnInput}
      />
      <div className="App">
        <div className="user-container">
          <ul className="suggestions">
            {results.length === undefined || results.length === 0 ? (
              <Noresults />
            ) : (
              results.map(function (item, index) {
                if (index <= 3) {
                  let hlName = item.Name.slice(
                    0,
                    item.Name.length -
                      item.Name.substring(userInput.length).length
                  );
                  let rsName = item.Name.slice(
                    item.Name.length -
                      item.Name.substring(userInput.length).length,
                    item.Name.length
                  );
                  return (
                    <Pokemon
                      key={item.Number}
                      hlName={hlName}
                      rsName={rsName}
                      img={item.img}
                      types={item.Types}
                    />
                  );
                } else {
                  return "";
                }
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
