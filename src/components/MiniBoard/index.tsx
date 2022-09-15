import React from 'react'
import { MiniBoardProps } from '../../types'

const Index = ({ finalBoard, name, player }: MiniBoardProps) => {
  return (
    <div className='mini-board-container'>
      <div
        className={`mini-board ${
          player === 'p1' ? 'mini-board-p1' : 'mini-board-p2'
        }`}
        onContextMenu={(e: Event) => e.preventDefault()}
      >
        {finalBoard.current.map((state: any, index: number) => (
          <div
            key={index}
            className={`block mini ${state}`}
            data-index={index}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Index
