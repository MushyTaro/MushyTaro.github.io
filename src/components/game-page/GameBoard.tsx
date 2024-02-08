import black_disc_imagePath from "../../assets/black-disc.png";
import green_dot_imagePath from "../../assets/green-dot.png";
import white_disc_imagePath from "../../assets/white-disc.png";
import { GridValue } from "../../types";
import "../../styles/game-page/GameBoard.css";

function Grid({ value }: { value: GridValue }) {
  if (value === "") {
    return <div className="gameboard-grid" />;
  }
  return value === "V" ? (
    <div className="gameboard-grid">
      <img className="gameboard-grid__indicator" src={green_dot_imagePath} alt="Valid Move Indicator" />
    </div>
  ) : (
    <div className="gameboard-grid">
      <img
        className="gameboard-grid__disc"
        src={value === "W" ? white_disc_imagePath : black_disc_imagePath}
        alt={`${value === "W" ? "White" : "Black"} Disc`}
      />
    </div>
  );
}
export default function GameBoard({ board }: { board: GridValue[][] }) {
  return (
    <div className="reversi-board">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const index = `${rowIndex}-${colIndex}`;
          return <Grid key={index} value={value} />;
        })
      )}
    </div>
  );
}
