import { Grid } from "../context/mapContext";

export function getTurbinePower(grid: Grid) {
  return 1000;
}

export function getGameScore(gameGrid: Grid[][]) {
  return gameGrid.reduce((accum, current) => {
    const gridScores = current.map(item => item.generatedPower);
    const total = gridScores.reduce((acc, curr) => acc + curr, 0);
    return accum + total;
  }, 0);
}

export function getRemainingBudget(total: number, gameGrid: Grid[][]) {
  const used = gameGrid.reduce((accum, current) => {
    const costs = current.map(item =>
      item.hasTurbine && item.placingCost ? item.placingCost : 0
    );
    const total = costs.reduce((acc, curr) => acc + curr, 0);
    return accum + total;
  }, 0);
  return total - used;
}
