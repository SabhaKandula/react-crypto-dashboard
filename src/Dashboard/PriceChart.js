import React from "react";
import HighchartsConfig from "./HighchartsConfig";
import ReactHighcharts from "react-highcharts";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import HighChartsTheme from "./HighChartsTheme";
import ChartSelect from "./ChartSelect";

ReactHighcharts.Highcharts.setOptions(HighChartsTheme);
//Appcontext Consumer must have the call back function

export default function PriceChart() {
  return (
    <AppContext.Consumer>
      {({ historical, changeChartSelect }) => (
        <Tile>
          <ChartSelect
            defaultValue="months"
            onChange={e => changeChartSelect(e.target.value)}
          >
            <option value="days">days</option>
            <option value="weeks">weeks</option>
            <option value="months">months</option>
          </ChartSelect>
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
