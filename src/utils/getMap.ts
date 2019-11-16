interface Grid {
  x: number;
  y: number;
  canPlace: boolean;
  hasTurbine: boolean;
  placingCost: number;
  generatedPower: number;
}

export function getMap(xAxis: number, yAxis: number): Grid[] {
  const map: Grid[] = [];
  for (let x = 0; x < xAxis; x++) {
    for (let y = 0; y < yAxis; y++) {
      let grid = {
        x,
        y,
        canPlace: Boolean(Math.random() > 0.2),
        hasTurbine: false,
        placingCost: 200 + Math.floor(Math.random() * 100),
        generatedPower: 0
      };
      map.push(grid);
    }
  }

  return map;
}
