import {
  createEmptyBoard,
  indexToCoordinate,
  coordinateToIndex,
  showSelectBlock,
  canAttack,
  checkAttack,
  showAttack,
  checkSunk,
} from '../../utils/boardTools.js'
import {
  randomAttack,
  addPotentialTarget,
  attackPotentialTarget,
} from '../../utils/computerTools'
import React, { useEffect, useRef } from 'react'
import * as BLOCK_STATE from '../../utils/blockState'
import * as GAME_STATE from '../../utils/gameState'
import { FormattedMessage } from 'react-intl'
import { AttackBoardProps, Position } from '../../types'

const AttackBoard = ({
  player,
  name,
  formData,
  gameState,
  setGameState,
  attack,
  setAttack,
  finalBoard,
  comAttack,
  setComAttack,
  p1FinalBoard,
}: AttackBoardProps) => {
  // Use ref store game state
  const state = useRef(gameState)
  const isMyTurn = gameState.includes(player)
  const isSingleMode: boolean = formData.playMode === 'singlePlayer'
  const potentialTargets = useRef([])

  // Create an empty board
  let board = createEmptyBoard()

  // Rending select block
  board = showSelectBlock(board, attack[0].position)

  // Rending attack
  board = showAttack(board, attack)

  // Computer attack
  useEffect(() => {
    if (isSingleMode && state.current === GAME_STATE.P2ATTACK) {
      let attackPosition: Position

      if (!potentialTargets.current.length || formData.difficulty === 'easy') {
        // No potential target, random attack
        attackPosition = randomAttack(comAttack)
      } else {
        // Attack potential target
        attackPosition = attackPotentialTarget(potentialTargets, comAttack)
      }

      const isHit: boolean = checkAttack(p1FinalBoard.current, attackPosition)

      // If hit, add potential target
      if (isHit) {
        potentialTargets.current = addPotentialTarget(
          attackPosition,
          comAttack,
          potentialTargets
        )
      }

      const { row, col } = attackPosition
      setComAttack((prev: any) => [
        ...prev,
        {
          position: {
            row: row,
            col: col,
          },
          state: isHit ? BLOCK_STATE.HIT : BLOCK_STATE.MISS,
          // If missing
          ship: p1FinalBoard.current[coordinateToIndex(row, col)],
        },
      ])
      // Is sinking?
      setComAttack((prev: any) => {
        checkSunk(prev, p1FinalBoard.current, row, col, potentialTargets)
      })
      // Switch attack
      setGameState(GAME_STATE.P1ATTACK)
      state.current = GAME_STATE.P1ATTACK
    }
  }, [gameState])

  // Who wins?
  if (
    attack.filter((item: any) => item.state === BLOCK_STATE.SANK).length === 17
  ) {
    setGameState(player === 'p1' ? GAME_STATE.P2WIN : GAME_STATE.P1WIN)
  }

  // Select attack coordinate
  const handleMove = (index: number) => {
    const { row, col } = indexToCoordinate(index)
    setAttack((prev: any) => {
      const copy = [...prev]
      copy[0].position = { row: row, col: copy }
      return copy
    })
  }

  // Attack!
  const handleAttack = () => {
    const { row, col } = attack[0].position
    if (!canAttack(attack)) {
      return
    }
    // Can attack
    const isHit = checkAttack(finalBoard.current, attack[0].position)
    // Add attack
    setAttack((prev: any) => [
      ...prev,
      {
        position: {
          row: row,
          col: col,
        },
        state: isHit ? BLOCK_STATE.HIT : BLOCK_STATE.MISS,
        // If missing
        ship: finalBoard.current[coordinateToIndex(row, col)],
      },
    ])
    // If sinking
    setAttack((prev: any) => checkSunk(prev, finalBoard.current, row, col))
    // Switch attack
    setGameState(
      gameState.includes('p1') ? GAME_STATE.P2ATTACK : GAME_STATE.P1ATTACK
    )
    state.current = gameState.includes('p1')
      ? GAME_STATE.P2ATTACK
      : GAME_STATE.P1ATTACK
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
      <div
        className={`board ${isMyTurn ? 'disabled' : ''} ${
          player === 'p1' ? 'board-p1' : 'board-p2'
        }`}
        onContextMenu={(e: Event) => e.preventDefault()}
      >
        {board.map((state: any, index: number) => (
          <div
            key={index}
            className={`block ${state}`}
            data-index={index}
            onMouseMove={isMyTurn ? () => {} : () => handleMove(index)}
            onClick={isMyTurn ? () => {} : () => handleAttack()}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default AttackBoard
