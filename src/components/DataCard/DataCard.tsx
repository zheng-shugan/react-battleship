import * as BLOCK_STATE from '../../utils/blockState'
import { FormattedMessage } from 'react-intl'
import { Paper } from '@mui/material'
import { DatCardProps } from '../../types'

const DataCard = ({ name, attack }: DatCardProps) => {
  const numberOfAttack = attack.length - 1
  const numberOfHit =
    attack.filter((item: any) => item.state !== BLOCK_STATE.MISS).length - 1
  const numberOfMiss = attack.filter(
    (item: any) => item.state !== BLOCK_STATE.MISS
  ).length

  const hitRate = ((numberOfHit / numberOfAttack) * 100).toFixed(0)

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 5 }}>
      <div className='data-card'>
        <h1 className='data-player'>{name}</h1>
        <p>
          <FormattedMessage id='over.numberOfAttack' />
          {numberOfAttack}
        </p>
        <p>
          <FormattedMessage id='over.numberOfHit' />
        </p>
        <p>
          <FormattedMessage id='over.numberOfMiss' />
          {numberOfMiss}
        </p>
        <p>
          <FormattedMessage id='over.hitRate' />
          {hitRate}%
        </p>
      </div>
    </Paper>
  )
}

export default DataCard
