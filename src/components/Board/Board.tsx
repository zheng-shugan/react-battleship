import {
  createEmptyBoard,
  indexToCoordinate,
  placeShipOnBoard,
  coordinateToIndex,
} from '../../utils/boardTools.js'
import { computerPlacingShip } from '../../utils/computerTools'
import * as BLOCK_STATE from '../../utils/blockState'
import * as GAME_STATE from '../../utils/gameState'
import { FormattedMessage } from 'react-intl'
import { BoardProps, Ship } from '../../types'

const Board = ({
  gameState,
  setGameState,
  formData,
  player,
  name,
  placingShip,
  setPlacingShip,
  placedShips,
  setPlacedShips,
  availableShips,
  setAvailableShips,
  finalBoard,
  comBoard,
}: BoardProps) => {
  // Is single mode?
  const isSingleMode: boolean = formData.playMode === 'singlePlayer'
  const isP1: boolean = gameState.includes('p1')

  // Game board
  let board: Array<any>

  if (isSingleMode && !isP1) {
    // Computer autoplay ship
    board = computerPlacingShip(availableShips)
    comBoard.current = board
    setGameState(GAME_STATE.P1ATTACK)
  } else {
    // Empty game board
    board = createEmptyBoard()

    if (placedShips.length) {
      placedShips.forEach((ship: any) => {
        board = placeShipOnBoard(board, ship)
      })
    }

    // Rending ship
    board = placeShipOnBoard(board, placingShip, true)

    // Update game state
    if (!availableShips.length) {
      finalBoard.current = board
      player === 'p1'
        ? setGameState(GAME_STATE.P2PLACING)
        : setGameState(GAME_STATE.P1ATTACK)
    }
  }

  // Update coordinate
  const handleMove = (index: number) => {
    if (!placingShip) {
      return
    }
    const { row, col } = indexToCoordinate(index)
    setPlacingShip((prev: any) => {
      return {
        ...prev,
        position: {
          row: row,
          col: col,
        },
      }
    })
  }

  // Placing ships
  const handleClick = () => {
    if (placingShip) {
      const {
        position: { row, col },
      } = placingShip
      if (board[coordinateToIndex(row, col)] !== BLOCK_STATE.FORBIDDEN) {
        // Placing ship
        setPlacedShips((prev: any) => [...prev, placingShip])
        // Move available ship
        setAvailableShips((prev: any) =>
          prev.filter((ship: Ship) => ship.name !== placingShip.name)
        )
        //
        setPlacingShip(null)
      }
    }
  }

  // Rotate
  const handleTurn = (evt: any) => {
    if (evt.button === 2 && placingShip) {
      setPlacingShip((prev: any) => {
        return {
          ...prev,
          direction:
            prev.direction === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL',
        }
      })
    }
  }

  return (
    <div className='board-container'>
      <h2
        className={`board-title ${
          player === 'p1' ? 'board-title-p1' : 'board-title-p2'
        }`}
      >
        <FormattedMessage id='board.title' values={{ name: <b>{name}</b> }} />
      </h2>
      {!gameState.includes(player) ? (
        <h1 className='waiting-title'>
          <FormattedMessage
            id='board.waitMessage'
            values={{ isP1: <b>{isP1 ? '1' : '2'}</b> }}
            defaultMessage={`Wait for player ${isP1 ? 'one' : 'two'} to place`}
          />
        </h1>
      ) : (
        <div
          className={`board ${player === 'p1' ? 'board-p1' : 'board-p2'}`}
          onContextMenu={(e) => e.preventDefault()}
        >
          {board.map((state, index) => (
            <div
              key={index}
              className={`block ${state}`}
              data-index={index}
              onMouseMove={() => handleMove(index)}
              onMouseDown={handleTurn}
              onClick={handleClick}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Board
