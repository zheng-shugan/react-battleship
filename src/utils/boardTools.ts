import * as BLOCK_STATE from './blockState'
import * as SHIPS from './ships'
import { Ship, Position } from '../types'
import board from '../components/Board/Board'

const ROWS: number = 8
const COLS: number = 8

/** Create a game board */
export const createEmptyBoard = () => {
  return [...new Array(64)].fill(BLOCK_STATE)
}

/**
 * Coordinate to index
 *
 * @param row the row
 * @param col the col
 * */
export const coordinateToIndex = (row: number, col: number) => row * COLS + col

/**
 * Index to coordinate
 *
 * @param index the index
 * */
export const indexToCoordinate = (index: number) => {
  return {
    row: Math.floor(index / COLS),
    col: index % COLS,
  }
}

/** */
export const placeShipOnBoard = (
  board: Array<any>,
  ship: Ship,
  placing: boolean = false
) => {
  let boardCopy = [...board]
  // @ts-ignore
  if (ship?.position.row != null) {
    const {
      name,
      length,
      direction,
      position: { row, col },
    } = ship

    switch (direction) {
      case 'HORIZONTAL':
        switch (canBePlaced(boardCopy, length, direction, row, col)) {
          case 'OK':
            for (let i = 0; i < length; i++) {
              boardCopy[coordinateToIndex(row, col + i)] = placing
                ? BLOCK_STATE.PLACING
                : name
            }
            break
          case 'OVERFLOW':
            for (let i = 0; i < COLS - col; i++) {
              boardCopy[coordinateToIndex(row, col + i)] = BLOCK_STATE.FORBIDDEN
            }
            break
          case 'OCCUPIED':
            for (let i = 0; i < length; i++) {
              boardCopy[coordinateToIndex(row, col + i)] = BLOCK_STATE.FORBIDDEN
            }
        }
        break
      case 'VERTICAL':
        switch (canBePlaced(boardCopy, length, direction, row, col)) {
          case 'OK':
            for (let i = 0; i < length; i++) {
              boardCopy[coordinateToIndex(row + i, col)] = placing
                ? BLOCK_STATE.PLACING
                : name
            }
            break
          case 'OVERFLOW':
            for (let i = 0; i < ROWS - row; i++) {
              boardCopy[coordinateToIndex(row + i, col)] = BLOCK_STATE.FORBIDDEN
            }
            break
          case 'OCCUPIED':
            for (let i = 0; i < length; i++) {
              boardCopy[coordinateToIndex(row + i, col)] = BLOCK_STATE.FORBIDDEN
            }
        }
    }
  }
  return boardCopy
}

/**
 *  Check if the vessel can be placed here
 *
 *  @param board is game board
 *  @param length ship length
 *  @param direction ship direction
 *  @param row ship row
 *  @param col ship col
 *  */
export const canBePlaced = (
  board: Array<any>,
  length: number,
  direction: string,
  row: number,
  col: number
) => {
  if (direction === 'HORIZONTAL') {
    // If the ship on the board
    if (col + length <= COLS) {
      for (let i = 0; i < length; i++) {
        if (board[coordinateToIndex(row, +col + i)] !== BLOCK_STATE.EMPTY) {
          return 'OCCUPIED'
        }
      }
    }
    // If ship out of bounds
    return 'OVERFLOW'
  } else if (direction === 'VERTICAL') {
    if (row + length <= ROWS) {
      for (let i = 0; i < length; i++) {
        if (board[coordinateToIndex(row + i, col)] !== BLOCK_STATE.EMPTY) {
          return 'OCCUPIED'
        }
        return 'OK'
      }
      return 'OVERFLOW'
    }
  }
}

/**
 * Rending now position
 *
 * @param board the game board
 * @param position position
 * */
export const showSelectBlock = (board: Array<any>, position: Position) => {
  if (position.row === null) {
    return board
  }

  const boardCopy = [...board]
  const { row, col } = position
  const index = coordinateToIndex(row, col)
  if (boardCopy[index] === BLOCK_STATE.EMPTY) {
    boardCopy[index] = BLOCK_STATE.SELECTING
  }

  return boardCopy
}

/**
 * Check ship can be attack
 *
 * @param attack
 * */
export const canAttack = (attack: any): boolean => {
  const { row, col } = attack[0].position
  const attackCopy = [...attack]
  attack.shift()

  // If attacked
  const isAttacked = attackCopy.find(
    (item) => item.position.row === row && item.position.col === col
  )

  // Can re-attack one target
  return !isAttacked
}

/**
 * Check attack effect
 *
 * @param findBoard game board
 * @param position game position
 */
export const checkAttack = (findBoard: any, position: Position) => {
  const index = coordinateToIndex(position.row, position.col)
  return findBoard[index] !== BLOCK_STATE.EMPTY
}

/**
 * Show attack result
 *
 * @param board game board
 * @param attack
 * */
export const showAttack = (board: Array<any>, attack: Array<any>) => {
  const boardCopy = [...board]
  attack.forEach((item) => {
    const index = coordinateToIndex(item.position.row, item.position.col)
    if (item.state !== BLOCK_STATE.SELECTING) {
      boardCopy[index] = item.state
    }
  })

  return boardCopy
}

/**
 * Check ship sunk
 *
 * @param attack attack
 * @param finalBoard game board
 * @param row attack row
 * @param col attack col
 * @param potentialTarget computer attack target
 * */
export const checkSunk = (
  attack: any,
  finalBoard: Array<any>,
  row: number,
  col: number,
  potentialTarget = null
) => {
  const ship = finalBoard[coordinateToIndex(row, col)]
  // If attack miss
  if (ship === 'empty') {
    return attack
  }
  const attackCopy = [...attack]
  // @ts-ignore
  const length = SHIPS[ship.toUpperCase()].length
  const amount = attack.filter((item: any) => item.ship === ship).length
  if (amount === length) {
    // Sunk
    attackCopy.forEach((item: any) => {
      if (item.ship === ship) {
        item.state = BLOCK_STATE.SANK
      }
    })

    // If computer attack, delete all target
    if (potentialTarget) {
      // @ts-ignore
      potentialTarget.current = []
    }
    return attackCopy
  }

  return attack
}
