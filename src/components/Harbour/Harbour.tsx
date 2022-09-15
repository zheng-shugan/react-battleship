import React, { useContext } from 'react'

import { Context } from '../Wrapper/Wrapper'
import { HarbourProps } from '../../types'
import Ship from '../Ship/Ship'

const Harbour = ({
  gameState,
  p1PlacingShip,
  p1AvailableShips,
  p2AvailableShips,
  setP1PlacingShip,
  p2PlacingShip,
  setP2PlacingShip,
}: HarbourProps) => {
  const context = useContext(Context)

  const isP1: boolean = gameState.includes('p1')
  const placingShip = isP1 ? p1PlacingShip : p2PlacingShip
  const setPlacingShip = isP1 ? setP1PlacingShip : setP2PlacingShip
  const availableShips = isP1 ? p1AvailableShips : p2AvailableShips

  // Placing ship
  const handleSelect = (ship: any) => {
    setPlacingShip({
      ...ship,
      direction: 'HORIZONTAL',
      position: {
        row: null,
        col: null,
      },
    })
  }

  return (
    <div className='harbour'>
      {availableShips.map((ship: any) => (
        <div
          key={ship.name}
          className={`ship-container ${
            placingShip?.name === ship.name ? 'ship-selected' : ''
          }`}
          onClick={() => handleSelect(ship)}
        >
          <h3 className='ship-name'>
            {context.locale === 'zh-CN' ? ship.zh : ship.name}
          </h3>
          <Ship length={ship.length} />
        </div>
      ))}
    </div>
  )
}

export default Harbour
