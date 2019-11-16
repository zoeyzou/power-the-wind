import React, { FC, useContext } from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

import { Grid as GridType, MapContext, X, Y } from "../context/mapContext";
import { Turbine } from "./Turbine";
import ItemTypes from "../types/item-types";

const Wrapper = styled.div`
  display: flex;
`;

const StyledGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(${X}, 80px);
  grid-template-rows: repeat(${Y}, 80px);
`;

const StyledGridItem = styled.div<{ grid: GridType }>`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 10px;
  background-color: ${props => (props.grid.canPlace ? "white" : "lightblue")};

  > :last-child {
    position: absolute;
    right: 0;
    bottom: 5px;
  }
`;

export const Grid: FC = () => {
  const { map, updateMap } = useContext(MapContext);

  return (
    <Wrapper>
      <StyledGrid>
        {map.map((grids: GridType[]) =>
          grids.map((grid: GridType, index: number) => (
            <GridItem grid={grid} updateMap={updateMap} key={index}>
              {grid.hasTurbine && <Turbine />}
            </GridItem>
          ))
        )}
      </StyledGrid>
      <Turbine />
    </Wrapper>
  );
};

export const GridItem: FC<{
  grid: GridType;
  updateMap?: (grid: GridType) => void;
}> = ({ grid, updateMap, children }) => {
  const [{ isOver, canDrop, hasDrop }, drop] = useDrop({
    accept: (grid.canPlace && ItemTypes.TURBINE) || "test",
    canDrop: () => grid.canPlace && !grid.hasTurbine,

    drop: () => {
      updateMap && updateMap({ ...grid, hasTurbine: true });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      hasDrop: !!monitor.didDrop()
    })
  });

  return (
    <StyledGridItem
      grid={grid}
      ref={drop}
      style={{ borderColor: canDrop ? "pink" : "rgba(0, 0, 0, 0.2)" }}
    >
      {grid.canPlace && "Cost: " + grid.placingCost}
      {children}
    </StyledGridItem>
  );
};
