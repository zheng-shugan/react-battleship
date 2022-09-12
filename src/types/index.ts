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
