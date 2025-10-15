import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makePuzzle } from "../SudokuService";
import { setElapsed, decHints, resetGame } from "../../../store/gameSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Game({ givens, difficultyKey }) {
  const dispatch = useDispatch(); 
  const elapsed = useSelector((s) => s.game.elapsed);
  const hintsLeft = useSelector((s) => s.game.hintsLeft);

  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState({ row: null, col: null });
  const [invalidCells, setInvalidCells] = useState([]);

  // Puzzle yarat
  useEffect(() => {
    const { puzzle, solution } = makePuzzle(givens);
    setBoard(puzzle);
    setSolution(solution);
    dispatch(resetGame());
    setInvalidCells([]);
  }, [givens, dispatch]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setElapsed(elapsed + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [elapsed, dispatch]);

  // Xanaya deyer yazmaq
  const handleChange = (r, c, val) => {
    if (!solution[r][c]) return;
    if (val < 1 || val > 9) return;

    setHistory([...history, JSON.parse(JSON.stringify(board))]);
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = parseInt(val);
    setBoard(newBoard);

    // duzgun/yanlısh yoxlama
    if (solution[r][c] !== parseInt(val)) {
      setInvalidCells((prev) => [...prev, { row: r, col: c }]);
    } else {
      setInvalidCells((prev) =>
        prev.filter((cell) => !(cell.row === r && cell.col === c))
      );
    }
  };

  // huceyreye click
  const handleCellClick = (r, c) => {
    setSelected({ row: r, col: c });
  };

  // Numpad click
  const handleNumberClick = (num) => {
    if (selected.row === null || selected.col === null) return;
    handleChange(selected.row, selected.col, num);
  };

  // Undo
  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setBoard(prev);
    setHistory(history.slice(0, history.length - 1));
    setInvalidCells([]);
  };

  // secilmish huc sil
  const handleClear = () => {
    if (selected.row === null || selected.col === null) return;
    setHistory([...history, JSON.parse(JSON.stringify(board))]);
    const newBoard = board.map((row) => [...row]);
    newBoard[selected.row][selected.col] = 0;
    setBoard(newBoard);
    setInvalidCells((prev) =>
      prev.filter(
        (cell) => !(cell.row === selected.row && cell.col === selected.col)
      )
    );
  };

  // ipucu
  const handleHint = () => {
    if (hintsLeft <= 0) return;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          const newBoard = board.map((row) => [...row]);
          newBoard[r][c] = solution[r][c];
          setBoard(newBoard);
          dispatch(decHints());
          return;
        }
      }
    }
  };
  const navigate = useNavigate();

  // Oyunun bitməsini yoxlama
  useEffect(() => {
    if (board.length && solution.length) {
      const isComplete = board.every((row, rIdx) =>
        row.every((cell, cIdx) => cell === solution[rIdx][cIdx])
      );
      if (isComplete) {
        navigate("/result");
      }
    }
  }, [board, solution, navigate]);

  // time
  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  if (!board.length || !solution.length) return <div>Yuklenir...</div>;

  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="btn">
          ← Geri
        </Link>
        <h2>{difficultyKey.toUpperCase()}</h2>
        <div className="info">
          <span> {formatTime(elapsed)}</span>
          <span> {hintsLeft} ipucu</span>
        </div>
      </div>

      <div className="board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => {
              const isSelected = selected.row === rIdx && selected.col === cIdx;
              const isGiven = givens?.[rIdx]?.[cIdx] !== 0;
              const isInvalid = invalidCells.some(
                (cell) => cell.row === rIdx && cell.col === cIdx
              );
              const cellClass = `cell 
                ${isGiven ? "given" : ""} 
                ${isSelected ? "focused" : ""} 
                ${isInvalid ? "invalid" : ""} 
                ${rIdx % 3 === 2 && rIdx !== 8 ? "bottom-border" : ""}
                ${cIdx % 3 === 2 && cIdx !== 8 ? "right-border" : ""}
              `;
              return (
                <div
                  key={cIdx}
                  className={cellClass}
                  onClick={() => handleCellClick(rIdx, cIdx)}
                >
                  {cell !== 0 ? cell : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="numpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button key={num} onClick={() => handleNumberClick(num)}>
            {num}
          </button>
        ))}
      </div>

      <div className="controls">
        <button className="btn" onClick={handleUndo}>
          Geri al
        </button>
        <button className="btn" onClick={handleClear}>
          {" "}
          Sil
        </button>
        <button className="btn" onClick={handleHint}>
          {" "}
          İpucu
        </button>
      </div>
    </div>
  );
}
