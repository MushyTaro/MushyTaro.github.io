import black_disc_imagePath from "../../assets/black-disc.png";
import white_disc_imagePath from "../../assets/white-disc.png";
import { DiscColor } from "../../types";

type GridValue = DiscColor | "";

function Grid({ value }: { value: GridValue }) {
  return value === "" ? (
    <div className="gameboard-grid" />
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
export default function GameBoard() {
  // Function to render a single row of the board
  const initialBoard: GridValue[][] = Array.from({ length: 8 }, () => Array(8).fill(""));
  initialBoard[3][3] = "W";
  initialBoard[4][4] = "W";
  initialBoard[3][4] = "B";
  initialBoard[4][3] = "B";
  return (
    <div className="reversi-board">
      {initialBoard.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const index = `${rowIndex}-${colIndex}`;
          return <Grid key={index} value={value} />;
        })
      )}
    </div>
  );
}
