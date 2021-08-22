import React, { useEffect } from "react";
import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import Moment from "react-moment";

import { formatDecimalNumber, getCategory, getColorCode } from "../utils";

const getChartValues = (values) => {
  const city = values
    .filter((obj) => typeof obj.city !== "undefined")
    .map((obj) => obj.city);
  const aqi = values
    .filter((obj) => typeof obj.aqi !== "undefined")
    .map((obj) => obj.aqi);
  const updated = values
    .filter((obj) => typeof obj.updated !== "undefined")
    .map((obj) => obj.updated);
  return { city, aqi, updated };
};

function Chart(props) {
  const chartValues = getChartValues(props.values);
  const chartID = "chart-aqi-differences";
  const chartTitleyaxis = "AQI";
  const series = [
    {
      name: chartTitleyaxis,
      data: chartValues.aqi,
    },
  ];

  const options = {
    theme: {
      mode: "dark",
    },
    chart: {
      id: chartID,
      type: "bar",
      height: 350,
      background: "#212529",
      fontFamily: "Roboto, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartValues.city,
    },
    yaxis: {
      min: 0,
      max: 500,
      tickAmount: 6,
      forceNiceScale: true,
      decimalsInFloat: 0,
      title: {
        text: chartTitleyaxis,
      },
    },
    fill: {
      opacity: 1,
    },
    colors: [
      ({ value }) => {
        return getColorCode(value);
      },
    ],
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const category = getCategory(series[seriesIndex][dataPointIndex]);
        const colorCode = getColorCode(series[seriesIndex][dataPointIndex]);
        const content = (
          <>
            <div className="apexcharts-tooltip-title">
              {w.globals.labels[dataPointIndex]}
            </div>
            <div
              className="apexcharts-tooltip-series-group apexcharts-active"
              style={{ order: 1, display: "flex" }}
            >
              <span
                className="apexcharts-tooltip-marker"
                style={{ backgroundColor: colorCode }}
              ></span>
              <div className="apexcharts-tooltip-text">
                <div>
                  <span>
                    {formatDecimalNumber(series[seriesIndex][dataPointIndex])}{" "}
                    {w.globals.seriesNames[seriesIndex]}
                  </span>
                  <span className="mx-1">&bull;</span>
                  <span>{category.label}</span>
                </div>
                <div>
                  <span>Updated </span>
                  <Moment fromNow>{chartValues.updated[dataPointIndex]}</Moment>
                </div>
              </div>
            </div>
          </>
        );
        return renderToString(content);
      },
    },
  };

  useEffect(() => {
    const newChartValues = getChartValues(props.values);

    let newSeriesArr = [...series];
    newSeriesArr[0].data = newChartValues.aqi;
    ApexCharts.exec(chartID, "updateSeries", [...newSeriesArr], true);

    let newOptions = { ...options };
    newOptions.xaxis.categories = newChartValues.city;
    ApexCharts.exec(chartID, "updateOptions", { ...newOptions }, false, true);
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="chart">
      <div className="row">
        <div className="col col-xl-10 mx-xl-auto">
          <h3 className="text-center mb-3">Comparison Chart</h3>
          <ReactApexChart
            options={options}
            series={[...series]}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

Chart.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Chart;
