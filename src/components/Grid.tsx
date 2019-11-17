import React, { FC, useContext } from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

import { Grid as GridType, MapContext, X, Y } from "../context/mapContext";
import { Turbine, TurbineWrapper } from "./Turbine";
import ItemTypes from "../types/item-types";
import { getTurbinePower } from "../utils/calc";

const StyledGrid = styled.main`
  flex: 2;
  display: grid;
  grid-template-columns: repeat(${X}, 120px);
  grid-template-rows: repeat(${Y}, 120px);
  gap: 1px;
`;

const CostAndEnergy = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledGridItem = styled.div<{ grid: GridType }>`
  position: relative;
  font-size: 10px;
  background-color: ${props =>
    props.grid.hasPowerStore
      ? "beige"
      : props.grid.canPlace
      ? "#D8E6E7"
      : "#6E7783"};
  border-width: 1px;

  ${TurbineWrapper} {
    position: absolute;
    right: 0;
    bottom: 5px;
  }
`;

export const Grid: FC = () => {
  const { map, updateMap } = useContext(MapContext);

  return (
    <StyledGrid>
      {map.map((grids: GridType[]) =>
        grids.map((grid: GridType, index: number) => (
          <GridItem grid={grid} updateMap={updateMap} key={index}>
            {grid.hasTurbine && <Turbine />}
            {grid.hasPowerStore && "POWER STORE"}
          </GridItem>
        ))
      )}
    </StyledGrid>
  );
};

const GridItem: FC<{
  grid: GridType;
  updateMap?: (grid: GridType) => void;
}> = ({ grid, updateMap, children }) => {
  const [{ isOver, canDrop, hasDrop }, drop] = useDrop({
    accept: (grid.canPlace && ItemTypes.TURBINE) || "test",
    canDrop: () => !!grid.canPlace && !grid.hasTurbine,

    drop: () => {
      updateMap &&
        updateMap({
          ...grid,
          hasTurbine: true,
          generatedPower: getTurbinePower(grid)
        });
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
      style={{ borderColor: canDrop ? "#9DC3C1" : "" }}
    >
      <CostAndEnergy>
        {grid.canPlace && grid.placingCost && (
          <div>Cost: {grid.placingCost}</div>
        )}
        {grid.generatedPower !== 0 && <div>Power: {grid.generatedPower}</div>}
      </CostAndEnergy>
      {children}
    </StyledGridItem>
  );
};
