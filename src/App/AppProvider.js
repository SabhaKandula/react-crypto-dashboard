import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
const cc = require("cryptocompare");
export const AppContext = React.createContext();
const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "XMR", "ETH", "DOGE"],
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavorite: this.setCurrentFavorite,
      changeChartSelect: this.changeChartSelect,
      timeInterval: "months"
    };
  }

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({
        favorites
      });
    }
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    // We must filter the empty price objects (not in the lecture)
    prices = prices.filter(price => Object.keys(price).length);
    this.setState({ prices });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({
      favorites: _.pull(favorites, key)
    });
  };

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  }

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];
    this.setState({ historical });
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
  };
  fetchCoins = async () => {
    let coinList = await cc.coinList();
    coinList = coinList.Data;
    this.setState({
      coinList
    });
  };

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        page: "dashboard",
        firstVisit: false,
        currentFavorite,
        prices: null,
        historical: null
      },
      () => this.fetchPrices()
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  setPage = page => {
    this.setState({
      page
    });
  };
  setCurrentFavorite = sym => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null
      },
      this.fetchHistorical
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorite: sym
      })
    );
  };
  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  }
  isInFavorites = key => _.includes(this.state.favorites, key);
  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });
  changeChartSelect = value => {
    this.setState({ timeInterval: value, historical: null }, () =>
      this.fetchHistorical()
    );
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
