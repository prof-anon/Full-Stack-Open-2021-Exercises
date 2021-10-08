import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setcountry] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setcountry(response.data);
    });
  }, []);

  let content = search.trim()
    ? countries.filter((country) => {
        const {
          name: { common },
        } = country;
        const filterdisplay = common.toLowerCase().includes(search);
        return filterdisplay;
      })
    : [];

  console.log({ content });

  return (
    <div className="App">
      <div>
        find countries{" "}
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="content">
        {content.length > 10 && <p>Too many matches, specify another filter</p>}
        {content.length < 10 &&
          content.map((display, displayIndex) => {
            return (
              <p key={`country-filtered-index${displayIndex}`}>
                {display.name.common}
              </p>
            );
          })}
        {content.length === 1 &&
          content.map((display, displayIndex) => {
            return (
              <div>
                <h1 key={`country-filtered-index${display.name.official}`}>
                  {display.name.common}
                </h1>
                <img src={display.flags.svg} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default App;
