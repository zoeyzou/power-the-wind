import React from "react";

export const X = 6;
export const Y = 6;
export const BUDGET = 5000;

export interface Location {
  x: number;
  y: number;
}

export interface Grid extends Location {
  canPlace?: boolean;
  hasTurbine: boolean;
  placingCost?: number;
  generatedPower: number;
  hasPowerStore?: boolean;
}

interface MapContext {
  map: Grid[][];
  powerStorage: Location;
  updateMap?: (grid: Grid) => void;
  gameBudget: number;
  gameScore: number;
}

export const MapContext = React.createContext<MapContext>({
  map: [],
  powerStorage: {
    x: 0,
    y: 0
  },
  gameBudget: 0,
  gameScore: 0
});

export const MapContextProvider = MapContext.Provider;
export const MapContextConsumer = MapContext.Consumer;
