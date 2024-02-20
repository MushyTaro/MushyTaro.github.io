export type DiscColor = "B" | "W";
export type Difficulty = "Easy" | "Hard";
export type GridValue = DiscColor | "" | "V";
export interface DiscColorBoardState {
  discColor: DiscColor;
  board: GridValue[][];
}
export interface GridPosition {
  row: number;
  col: number;
}
