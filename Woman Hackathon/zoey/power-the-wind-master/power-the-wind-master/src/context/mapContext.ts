import React from "react";

export const X = 10;
export const Y = 10;

export interface Location {
  x: number;
  y: number;
}

export interface Grid extends Location {
  canPlace: boolean;
  hasTurbine: boolean;
  placingCost: number;
  generatedPower: number;
}

interface MapContext {
  map: Grid[][];
  powerStorage: Location;
  updateMap?: (grid: Grid) => void;
}

export const MapContext = React.createContext<MapContext>({
  map: [],
  powerStorage: {
    x: 0,
    y: 0
  }
});

export const MapContextProvider = MapContext.Provider;
export const MapContextConsumer = MapContext.Consumer;
