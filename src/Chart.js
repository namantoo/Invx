import React from "react";
import Apiurl from "./apiurl";
import { useEffect, useState } from "react";
// import Chartist from 'chartist';
// import Moment from "react-moment";
import CountrySelector from "./selector";
import { COUNTRIES } from "./countries";
import ReactDOM from "react-dom";
import ChartistGraph from "react-chartist";
// import Chartist from "react-chartist";


function Chart() {
  const apiu = Apiurl();
  // useEffect(() => {
window.onload = function() {
    var Chartist = require('chartist');
    const moment = require('moment');

    // var Chartist = require('react-chartist');
    // var ChartistGraph = require('react-chartist');
    // console.log(Chartist.Line);
    var datapoints = [5, 2, 4, 6, 3];
    var max = Math.max(...datapoints);
    var high = (0.1 * max) + max;
    console.log(max);
    console.log(high);
    const data = {
      // labels: ['M', 'T', 'W', 'T', 'F'],
      series: [{
        name: 'series-1',
        data: [
          {x: new Date(143134652600), y: 53},
          {x: new Date(143234652600), y: 40},
          {x: new Date(143340052600), y: 45},
          {x: new Date(143366652600), y: 40},
          {x: new Date(143410652600), y: 20},
          {x: new Date(143508652600), y: 32},
          {x: new Date(143569652600), y: 18},
          {x: new Date(143579652600), y: 11}
        ]
      }]
    };

    const options = {
        // backgroundColor: "rgba(255,0,0,0.5)",
      lineSmooth: false,
      height: '50vh',
      low: 0,
      // high: high,
      showArea: false,
      showGridBackground: true,
      axisY: {
        showLabel: false,
        onlyInteger: true
      },
      axisX: {
        showLabel: false,
        type: Chartist.FixedScaleAxis,
        divisor: 5,
        labelInterpolationFnc: function(value) {
          return moment(value).format('MMM D');
        }
      },
      fullWidth: true
    };

    const typegraph = 'Line';
    new Chartist.Line('.ct-chart', data, options);
};
  // }, []);

  return (
    <>
      <div className="fill-window bg-gray-50">
        <div className="container">
          <div className="row h-screen">
            <div
              className="columns two h-full hidden sm:block bg-green-400"
              style={{}}
            >
              &nbsp;
            </div>
            <div className="columns eight">
              <div>
                <div className="ct-chart" style={{backgroundColor: "#6CB86C", borderRadius: "10px"}}></div>
              </div>
              {/* <div>
                <ChartistGraph data={data} options={options} type={typegraph} />
            </div> */}
            </div>
            <div
              className="columns two h-full hidden sm:block bg-green-400"
              style={{}}
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
