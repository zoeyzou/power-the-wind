import React, { FC, useContext } from "react";
import styled from "styled-components";

import { Grid as GridType, MapContext, X, Y } from "../context/mapContext";

const StyledGrid = styled.main`
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(${X}, 1fr);
  grid-template-rows: repeat(${Y}, 1fr);
`;

const StyledGridItem = styled.div<{ grid: GridType }>`
  border: 1px solid grey;
  background-color: ${props => (props.grid.canPlace ? "white" : "red")};
`;

export const Grid: FC = () => {
  const { map } = useContext(MapContext);

  return (
    <StyledGrid>
      {map.map((grids: GridType[]) =>
        grids.map((grid: GridType, index: number) => (
          <GridItem grid={grid} key={index} />
        ))
      )}
    </StyledGrid>
  );
};

export const GridItem: FC<{ grid: GridType }> = ({ grid }) => {
  return (
    <StyledGridItem grid={grid}>
      {grid.canPlace && grid.placingCost}
    </StyledGridItem>
  );
};
