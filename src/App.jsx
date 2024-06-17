import Player from './components/Player'
import GameBoard from './components/GameBoard'
import { useState } from 'react'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'

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
        turns={gameTurns} />
      </div>
      <Log logTurns={gameTurns} />
    </main>
  )
}

export default App
