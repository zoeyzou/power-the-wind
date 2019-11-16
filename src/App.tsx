import React from "react";
import "./App.css";
import { getMap } from "./utils/getMap";
import { MapContextProvider, X, Y } from "./context/mapContext";
import { Grid } from "./components/Grid";

const App: React.FC = () => {
  return (
    <MapContextProvider
      value={{
        map: getMap(X, Y),
        powerStorage: {
          x: Math.floor(X / 2),
          y: Math.floor(Y / 2)
        }
      }}
    >
      <Grid />
    </MapContextProvider>
  );
};

export default App;
