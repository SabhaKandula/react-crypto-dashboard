import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";
import CoinGrid from "../Settings/CoinGrid";

export default function() {
  return (
    <Page name="settings">
      <WelcomeMessage />
      <CoinGrid />
      <ConfirmButton />
    </Page>
  );
}
