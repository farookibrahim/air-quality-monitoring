import React, { useState, useEffect } from "react";
import { findIndex } from "lodash";

import Table from "./components/Table";
import Chart from "./components/Chart";

const socket = new WebSocket("wss://city-ws.herokuapp.com");

socket.onopen = () => {
  console.log("WebSocket Client Connected");
};

function App() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    socket.onmessage = (msgEvent) => {
      const data = JSON.parse(msgEvent.data);
      const updated = new Date();

      if (data.length > 0) {
        setValues((prevValues) => {
          let newValArr = [...prevValues];
          data.forEach(({ city, aqi }) => {
            let index = findIndex(newValArr, { city });
            if (index < 0) {
              newValArr.push({ city, aqi, updated });
            } else {
              newValArr[index].aqi = aqi;
              newValArr[index].updated = updated;
            }
          });
          return [...newValArr];
        });
      }
    };
  }, []);

  return (
    <div className="container">
      <main className="py-5">
        <div className="mb-3 text-center">
          <h2>Live Air Quality Monitoring</h2>
        </div>
        {values.length ? (
          <>
            <Table values={[...values]} />
            <Chart values={[...values]} />
          </>
        ) : (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
