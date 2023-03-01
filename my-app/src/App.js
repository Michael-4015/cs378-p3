import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Grid from "@mui/material/Grid";

function MainPage() {
  const [newYear, setYear] = useState("");
  const [years, addYear] = useState(["2021", "2020", "2019"]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [currYear, setCurrYear] = useState("2021");

  function callApi(year) {
    setCurrYear(year);
  }

  useEffect(() => {
    let url =
      "https://site.api.espn.com/apis/site/v3/sports/football/nfl/leaders?season=" +
      currYear;
    axios
      .get(url)
      .then(function (response) {
        console.log(response.data["leaders"]["categories"][0]["leaders"]);
        // handle success
        if (!years.includes(currYear)) {
          years.push(currYear);
        }
        setStats(response.data["leaders"]["categories"][0]["leaders"]);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("Could not find stats for " + currYear);
      })
      .then(function () {
        // always executed
      });
  }, [currYear]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>NFL Postseason Passing Leaders</h1>
          <div>
            {years.map(function (year) {
              return <button onClick={() => callApi(year)}>{year} </button>;
            })}
          </div>
        </header>
        <div>
          <input value={newYear} onChange={(e) => setYear(e.target.value)} />
          <button
            onClick={() => {
              setYear("");
              callApi(newYear);
            }}
          >
            +
          </button>
        </div>
        <div>
          <h2> {currYear}</h2>
          {loading
            ? console.log("loading")
            : stats.map((athlete, index) => {
                return (
                  <p>
                    {index + 1}. {athlete.athlete.displayName} {athlete.value}{" "}
                    yards
                  </p>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default MainPage;
