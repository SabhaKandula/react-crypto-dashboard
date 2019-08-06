import React, { Component } from "react";
import { async } from "q";
const cc = require("cryptocompare");
export const AppContext = React.createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites
    };
  }
  componentDidMount() {
    this.fetchCoins();
  }
  fetchCoins = async () => {
    let coinList = await cc.coinList();
    coinList = coinList.Data;
    this.setState({
      coinList
    });
  };
  confirmFavorites = () => {
    this.setState({
      page: "dashboard",
      firstVisit: false
    });
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        test: "hello"
      })
    );
  };

  setPage = page => {
    this.setState({
      page
    });
  };
  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  }
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
