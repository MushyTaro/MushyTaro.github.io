import black_disc_imagePath from "../../assets/black-disc.png";
import green_dot_imagePath from "../../assets/green-dot.png";
import white_disc_imagePath from "../../assets/white-disc.png";
import { GridValue } from "../../types";
import "../../styles/game-page/GameBoard.css";

function Grid({ value }: { value: GridValue }): JSX.Element {
  return (
    <div className="gameboard-grid">
      {value !== "" && (
        <img
          className={value === "V" ? "gameboard-grid__indicator" : "gameboard-grid__disc"}
          src={value === "V" ? green_dot_imagePath : value === "W" ? white_disc_imagePath : black_disc_imagePath}
          alt={value === "V" ? "Valid Move Indicator" : `${value === "W" ? "White" : "Black"} Disc`}
        />
      )}
    </div>
  );
}
export default function GameBoard({ board }: { board: GridValue[][] }): JSX.Element {
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
