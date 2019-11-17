import { Grid, Location } from "../context/mapContext";

export function getMap(
  xAxis: number,
  yAxis: number,
  powerStorage: Location
): Grid[][] {
  const mapMatrix: Grid[][] = [];
  for (let y = 0; y < yAxis; y++) {
    mapMatrix[y] = [];
    for (let x = 0; x < xAxis; x++) {
      const hasPowerStore = hasPowerStorage(y, x, powerStorage);
      mapMatrix[y][x] = {
        x,
        y,
        hasTurbine: false,
        generatedPower: 0
      };
      if (hasPowerStore) {
        mapMatrix[y][x].hasPowerStore = true;
      } else {
        mapMatrix[y][x].canPlace = Boolean(Math.random() > 0.2);
        mapMatrix[y][x].placingCost = 200 + Math.floor(Math.random() * 100);
      }
    }
  }

  return mapMatrix;
}

export function hasPowerStorage(
  xAxis: number,
  yAxis: number,
  powerStorage: Location
): boolean {
  return powerStorage.x === xAxis && powerStorage.y === yAxis;
}
