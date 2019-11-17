import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

import turbine from "../assets/turbine.svg";
import ItemTypes from "../types/item-types";

export const TurbineWrapper = styled.div<{ isDragging?: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 80px;
  max-height: 80px;

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Turbine = () => {
  const [{ opacity }, drag] = useDrag({
    item: { type: ItemTypes.TURBINE },
    begin: monitor => {
      console.log({ monitor: monitor.getHandlerId() });
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <TurbineWrapper ref={drag} style={{ opacity }}>
      <img src={turbine} />
    </TurbineWrapper>
  );
};
