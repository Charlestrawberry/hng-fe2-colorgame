import { useState, useEffect } from "react";
import "./App.css"; // Import the external CSS file

const generateShades = (baseColor) => {
  return [
    `rgba(${baseColor}, 1)`,
    `rgba(${baseColor}, 0.8)`,
    `rgba(${baseColor}, 0.6)`,
    `rgba(${baseColor}, 0.4)`,
    `rgba(${baseColor}, 0.2)`,
    `rgba(${baseColor}, 0.1)`
  ];
};

const colorMap = {
  red: "255, 0, 0",
  blue: "0, 0, 255",
  green: "0, 128, 0",
  yellow: "255, 255, 0",
  purple: "128, 0, 128",
  orange: "255, 165, 0"
};

const getRandomColor = () => {
  return Object.keys(colorMap)[Math.floor(Math.random() * Object.keys(colorMap).length)];
};

const ColorGuessingGame = () => {
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [targetColor, setTargetColor] = useState("");
  const [gameStatus, setGameStatus] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newBaseColor = getRandomColor();
    const newShades = generateShades(colorMap[newBaseColor]);
    const newCorrectAnswer = newShades[Math.floor(Math.random() * newShades.length)];
    const newTargetColor = newShades[Math.floor(Math.random() * newShades.length)];

    setOptions(newShades);
    setCorrectAnswer(newCorrectAnswer);
    setTargetColor(newTargetColor);
    setGameStatus("Guess the correct color!");
  };

  const handleGuess = (selectedColor) => {
    if (selectedColor === correctAnswer) {
      setGameStatus("Correct! 🎉");
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        return newScore;
      });
    } else {
      setGameStatus("Wrong! Try again.");
    }

    // Change the button colors after every click
    const newShades = generateShades(colorMap[getRandomColor()]);
    setOptions(newShades);
    setCorrectAnswer(newShades[Math.floor(Math.random() * newShades.length)]);
    setTargetColor(newShades[Math.floor(Math.random() * newShades.length)]);
  };

  const resetGame = () => {
    setScore(0);
    startNewGame();
  };

  return (
    <div className="game-container">
      <h1 className="game-title" data-testid="gameInstructions">Guess the correct color!</h1>
      <div
        className="color-display"
        style={{ backgroundColor: targetColor }}
        data-testid="colorBox"
      ></div>
      <div className="color-options">
        {options.map((color, index) => (
          <button
            key={index}
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            data-testid="colorOption"
          ></button>
        ))}
      </div>
      <p className="game-status" data-testid="gameStatus">{gameStatus}</p>
      <p className="score">Score: <span data-testid="score">{score}</span></p>
      <p className="high-score">High Score: <span>{highScore}</span></p>
      <button
        className="new-game-button"
        onClick={resetGame}
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGuessingGame;
