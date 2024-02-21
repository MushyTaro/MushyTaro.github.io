export type DiscColor = "B" | "W";
export type Difficulty = "Easy" | "Hard";
export type GridValue = DiscColor | "" | "V";
export type MessageType = "skipComputer" | "skipPlayer" | "end" | "";
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
