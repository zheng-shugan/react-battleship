export interface Position {
  row: number
  col: number
}

export interface Ship {
  name: string
  zh: string
  length: number
  direction?: string
  position?: Position
}

export interface FormData {
  p1Name: string
  p2Name: string
  playMode: string
  difficulty: string
}

export interface WelcomeProps {
  formData: FormData
  setGameState: any
  setFormData: any
}

export interface BoardProps {
  gameState: string
  setGameState: any
  formData: any
  player: any
  name: any
  placingShip: Ship
  setPlacingShip: any
  placedShips: any
  setPlacedShips: any
  availableShips: any
  setAvailableShips: any
  finalBoard: any
  comBoard: any
}

export interface ShipProps {
  length: number
}
