import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { Grid } from "./Grid";
import { Turbine } from "./Turbine";
import { MapContext } from "../context/mapContext";

const centering = css`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 5%;
`;

const ScoreWrapper = styled.div`
  padding: 10px 30px;
  background-color: #f5f5f5;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  margin-bottom: 10px;

  ${centering}

  > * {
    text-transform: uppercase;
  }
`;

const TurbineWrapper = styled.div`
  ${centering}
  padding: 30px 10px 10px;
  border: 1px solid #e3e3e3;
  background-color: #d8e6e7;
  border-radius: 4px;
`;

const SideMenu = styled.section`
  display: flex;
  flex-flow: column;
  margin-left: 5%;
  flex: 1;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  border: 2px solid #1ecd97;
  color: #1ecd97;
  font-family: "Lato";
  cursor: pointer;
  border-radius: 30px;
  font-size: 18px;
  padding: 20px 10px;

  &:hover {
    background: #1ecd97;
    color: white;
  }
`;

export const Board = () => {
  const { gameScore, gameBudget } = useContext(MapContext);

  return (
    <Wrapper>
      <Grid />
      <SideMenu>
        <ScoreWrapper>
          <p>Your Score</p>
          <h1>{gameScore}</h1>
        </ScoreWrapper>
        <ScoreWrapper>
          <p>Your Budget</p>
          <h1>{gameBudget}</h1>
        </ScoreWrapper>
        <TurbineWrapper>
          <Turbine />
          <p>👆Drag the turbine into the game</p>
        </TurbineWrapper>
        {/* <SubmitButton>Submit</SubmitButton> */}
      </SideMenu>
    </Wrapper>
  );
};
