import { Grid } from "../context/mapContext";

export function getMap(xAxis: number, yAxis: number): Grid[][] {
  const mapMatrix: Grid[][] = [];
  for (let y = 0; y < yAxis; y++) {
    mapMatrix[y] = [];
    for (let x = 0; x < xAxis; x++) {
      mapMatrix[y][x] = {
        x,
        y,
        canPlace: Boolean(Math.random() > 0.1),
        hasTurbine: false,
        placingCost: 200 + Math.floor(Math.random() * 100),
        generatedPower: 0
      };
    }
  }

  return mapMatrix;
}
