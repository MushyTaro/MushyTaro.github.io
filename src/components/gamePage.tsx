import { useParams } from "react-router-dom";
function GamePage() {
  const { difficulty, discColor } = useParams();
  return (
    <div>
      <h2>Game Page</h2>
      <p>Difficulty: {difficulty}</p>
      <p>Disc Color: {discColor}</p>
    </div>
  );
}

export default GamePage;
