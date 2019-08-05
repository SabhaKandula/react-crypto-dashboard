import React from "react";
import "./App.css";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import { AppProvider }   from "./AppProvider";

function App() {
  return (
    <div>
      <AppLayout>
        <AppProvider>
          <AppBar />
          <h1>Welcome to Crypto Dashboard</h1>{" "}
        </AppProvider>
      </AppLayout>
    </div>
  );
}

export default App;
