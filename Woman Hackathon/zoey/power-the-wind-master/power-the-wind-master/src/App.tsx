import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "./App.css";
import { getMap } from "./utils/getMap";
import {
  Grid as GridType,
  MapContextProvider,
  X,
  Y
} from "./context/mapContext";
import { Grid } from "./components/Grid";

const App: React.FC = () => {
  const [map, setMap] = useState(getMap(X, Y));

  return (
    <MapContextProvider
      value={{
        map,
        powerStorage: {
          x: Math.floor(X / 2),
          y: Math.floor(Y / 2)
        },
        updateMap: grid => {
          const newMapString = JSON.stringify(map);
          const newMap: GridType[][] = JSON.parse(newMapString);
          newMap[grid.y][grid.x] = grid;
          setMap(newMap);
        }
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <Grid />
      </DndProvider>
    </MapContextProvider>
  );
};

export default App;
