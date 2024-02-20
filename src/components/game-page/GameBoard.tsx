import black_disc_imagePath from "../../assets/black-disc.png";
import green_dot_imagePath from "../../assets/green-dot.png";
import white_disc_imagePath from "../../assets/white-disc.png";
import { getDiscsToFlip } from "../../logic/validLogic";
import { DiscColor, GridValue } from "../../types";
import "../../styles/game-page/GameBoard.css";

interface BoardProps {
  board: GridValue[][];
  playerTurn: DiscColor;
  onBoardPlay: (board: GridValue[][]) => void;
}

function Grid({ value, onSquareClick }: { value: GridValue; onSquareClick: () => void }): JSX.Element {
  if (value === "V") {
    return (
      <button type="button" className="gameboard-grid" onClick={onSquareClick}>
        <img className="gameboard-grid__indicator" src={green_dot_imagePath} alt="Valid Move Indicator" />
      </button>
    );
  }
  return (
    <div className="gameboard-grid">
      {value !== "" && (
        <img
          className="gameboard-grid__disc"
          src={value === "W" ? white_disc_imagePath : black_disc_imagePath}
          alt={`${value === "W" ? "White" : "Black"} Disc`}
        />
      )}
    </div>
  );
}

export default function GameBoard({ board, playerTurn, onBoardPlay }: BoardProps) {
  function handleClick(row: number, col: number) {
    const boardCopy: GridValue[][] = board.map((rowCopy) => [...rowCopy]);
    const discsToFlip = getDiscsToFlip({ row, col }, playerTurn, board);
    boardCopy[row][col] = playerTurn;
    discsToFlip.forEach((discToFlip) => {
      boardCopy[discToFlip.row][discToFlip.col] = playerTurn;
    });
    onBoardPlay(boardCopy);
  }

  return (
    <div className="reversi-board">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const index = `${rowIndex}-${colIndex}`;
          return <Grid key={index} value={value} onSquareClick={() => handleClick(rowIndex, colIndex)} />;
        })
      )}
    </div>
  );
}
