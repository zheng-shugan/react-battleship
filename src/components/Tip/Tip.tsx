import React from 'react'
import { FormattedMessage } from 'react-intl'
import * as GAME_STATE from '../../utils/gameState'

const Tip = ({ gameState }: string | any) => {
  let message: string | any

  switch (gameState) {
    case GAME_STATE.P1PLACING:
    case GAME_STATE.P2PLACING:
      message = <FormattedMessage id='tip.placing' />
      break
    case GAME_STATE.P1ATTACK:
      message = <FormattedMessage id='tip.p1Attack' />
      break
    case GAME_STATE.P2ATTACK:
      message = <FormattedMessage id='tip.p2Attack' />
  }

  return <p className='tip'>{message}</p>
}

export default Tip
