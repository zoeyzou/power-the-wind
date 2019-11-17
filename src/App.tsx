import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "./App.css";
import { getMap } from "./utils/getMap";
import {
  Grid as GridType,
  MapContextProvider,
  X,
  Y,
  BUDGET
} from "./context/mapContext";
import { Board } from "./components/Board";
import { getGameScore, getRemainingBudget } from "./utils/calc";

const App: React.FC = () => {
  const powerStore = {
    x: Math.floor(X / 2),
    y: Math.floor(Y / 2)
  };

  const [map, setMap] = useState(getMap(X, Y, powerStore));

  return (
    <MapContextProvider
      value={{
        map,
        powerStorage: {
          x: Math.floor(X / 2),
          y: Math.floor(Y / 2)
        },
        updateMap: (grid: GridType) => {
          const newMapString = JSON.stringify(map);
          const newMap: GridType[][] = JSON.parse(newMapString);
          newMap[grid.y][grid.x] = grid;
          setMap(newMap);
        },
        gameBudget: getRemainingBudget(BUDGET, map),
        gameScore: getGameScore(map)
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </MapContextProvider>
  );
};

export default App;
