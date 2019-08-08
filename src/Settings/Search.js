import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Style";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const SearchInput = styled.input`
  ${backgroundColor2}
  color:#1163c9;
  height: 25px;
  ${fontSize2}
  border: 1px solid;
  place-self: center left;
`;

export default function Search() {
  return (
    <SearchGrid>
      <h2>Search all coins</h2>
      <SearchInput />
    </SearchGrid>
  );
}
