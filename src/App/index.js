import React from "react";
import "./App.css";
import styled, { css } from "styled-components";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";

function App() {
  return (
    <div>
      <AppLayout>
        <AppBar />
        <h1>Welcome to Crypto Dashboard</h1>{" "}
      </AppLayout>
    </div>
  );
}

export default App;
