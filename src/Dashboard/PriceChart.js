import React from "react";
import HighchartsConfig from "./HighchartsConfig";
import ReactHighcharts from "react-highcharts";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import HighChartsTheme from "./HighChartsTheme";

ReactHighcharts.Highcharts.setOptions(HighChartsTheme);
//Appcontext Consumer must have the call back function

export default function PriceChart() {
  return (
    <AppContext.Consumer>
      {({ historical }) => (
        <Tile>
          {historical ? (
            <ReactHighcharts config={HighchartsConfig(historical)} />
          ) : (
            <div>Loading Historical Data...</div>
          )}
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
