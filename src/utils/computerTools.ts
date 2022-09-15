import {
  canBePlaced,
  coordinateToIndex,
  indexToCoordinate,
  createEmptyBoard,
  placeShipOnBoard,
} from './boardTools'
import { Position } from '../types'

/**
 * Get a random number
 *
 * @param min min number
 * @param max max number
 * */
export const getRandInt = (min: number, max: number) => {
  return Math.floor((max - min + 1) * Math.random() + min)
}

/**
 * Get a Random coordinate
 * */
export const getRandCoordinate = () => {
  return {
    row: getRandInt(0, 7),
    col: getRandInt(0, 7),
  }
}

/**
 * Get a random direction
 * */
export const getRandomDirection = () => {
  return getRandInt(0, 1) ? 'HORIZONTAL' : 'VERTICAL'
}

/**
 * Computer auto placed ship
 *
 * @param availableShips ship
 * */
export const computerPlacingShip = (availableShips: any) => {
  let board = createEmptyBoard()
  const shipCopy = [...availableShips]
  shipCopy.forEach((ship: any) => {
    while (true) {
      const position = getRandCoordinate()
      const direction = getRandomDirection()
      const length = ship.length

      if (
        canBePlaced(board, length, direction, position.row, position.col) ===
        'OK'
      ) {
        // Set ship
        board = placeShipOnBoard(board, {
          ...ship,
          direction: direction,
          position: position,
        })
        break
      }
    }
  })
  return board
}

/**
 * Check the ship can be attack
 *
 * @param attack game board
 * @param row attack row
 * @param col attack col
 * */
export const canAttack = (attack: any, row: number, col: number) => {
  const attackCopy = [...attack]
  attack.shift()
  // Check attacked
  const isAttacked = attackCopy.find((item: any) => {
    item.position.row === row && item.col === col
  })

  return !isAttacked
}

/**
 * Random attack
 *
 * @param attack game board
 * */
export const randomAttack = (attack: any) => {
  while (true) {
    const row = getRandInt(0, 7)
    const col = getRandInt(0, 7)

    if (canAttack(attack, row, col)) {
      return { row: row, col: col }
    }
  }
}

/** Add potential target
 * */
export const addPotentialTarget = (
  position: Position,
  attack: any,
  potentialTarget: any
) => {
  const { row, col } = position
  if (row + 1 <= 7 && canAttack(attack, row + 1, col)) {
    potentialTarget.current.push(coordinateToIndex(row + 1, col))
  }
  if (row - 1 >= 0 && canAttack(attack, row - 1, col)) {
    potentialTarget.current.push(coordinateToIndex(row - 1, col))
  }
  if (col + 1 <= 7 && canAttack(attack, row, col + 1)) {
    potentialTarget.current.push(coordinateToIndex(row, col + 1))
  }
  if (col - 1 >= 0 && canAttack(attack, row, col - 1)) {
    potentialTarget.current.push(coordinateToIndex(row, col - 1))
  }
  return potentialTarget.current
}

/** Attack potential target
 * */
export const attackPotentialTarget = (potentialTarget: any, attack: any) => {
  while (true) {
    const randIndex = getRandInt(0, potentialTarget.current.length - 1)
    const { row, col } = indexToCoordinate(potentialTarget.current[randIndex])
    if (canAttack(attack, row, col)) {
      // Delete potential target
      potentialTarget.current.splice(randIndex, 1)
      return {
        row: row,
        col: col,
      }
    } else {
      // Delete can't be attack target
      potentialTarget.current.splice(randIndex, 1)
    }
  }
}
