import React from "react";
import "./App.css";
import styled, { css } from "styled-components";

const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  ${props =>
    props.primary &&
    css`
      background: white;
      color: palevioletred;
    `}
`;

function App() {
  return (
    <div>
      <Button primary>GitHub</Button>
    </div>
  );
}

export default App;
