export type DiscColor = "B" | "W";
export type Difficulty = "Easy" | "Hard";
export type GridValue = DiscColor | "" | "V";
export type MessageType = "skip computer" | "skip player" | "end" | "";
export interface DiscColorBoardState {
  discColor: DiscColor;
  board: GridValue[][];
}
export interface GridPosition {
  row: number;
  col: number;
}
export type Scores = {
  playerScore: number;
  computerScore: number;
};
