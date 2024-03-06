export type DiscColor = "B" | "W";
export type GridValue = DiscColor | "" | "V";
export type MessageType = "skipComputer" | "skipPlayer" | "end" | "";
export type CtaType = "register" | "login";
export type CredentialSubmitStatus = "valid" | "format error" | "length error";
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
