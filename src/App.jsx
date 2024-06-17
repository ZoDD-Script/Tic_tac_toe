import Player from './components/Player'
import GameBoard from './components/GameBoard'
import { useState } from 'react'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [ gameTurns, setGameTurns ] = useState([])
  // const [ activeplayer, setActivePlayer] = useState('X')
  const activeplayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for(const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player 
  }

  for(const combination of WINNING_COMBINATIONS) {

  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X' );
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { 
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer
        },
        ...prevTurns,
      ]

      return updatedTurns;
    })
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName='Player 1' symbol='X' isActive={activeplayer === 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activeplayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} 
        // activePlayerSymbol={activeplayer} />
        board={gameBoard} />
      </div>
      <Log logTurns={gameTurns} />
    </main>
  )
}

export default App
