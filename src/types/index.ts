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

export interface HarbourProps {
  gameState: any
  p1PlacingShip: any
  p1AvailableShips: any
  setP1PlacingShip: any
  p2PlacingShip: any
  p2AvailableShips: any
  setP2PlacingShip: any
}

export interface AttackBoardProps {
  player: any
  name: string | any
  formData: FormData
  gameState: string
  setGameState: string
  attack: any
  setAttack: any
  finalBoard: any
  comAttack: any
  setComAttack: any
  p1FinalBoard: any
}

export interface DatCardProps {
  name: string
  attack: any
}
