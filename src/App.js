import "./App.css";
import Box from "./components/Box";
import Game from "./components/Game";

function App() {
  return (
    <>
      <div className="box-contianer">
        <Box />
      </div>
      <div className="divider" />
      <div className="game-container">
        <Game />
      </div>
    </>
  );
}

export default App;
