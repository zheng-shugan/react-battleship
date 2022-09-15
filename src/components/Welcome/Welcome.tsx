import * as GAME_STATE from '../../utils/gameState'
import React, { useContext } from 'react'
import Header from '../Header/Header'
import { FormattedMessage } from 'react-intl'
import { Context } from '../Wrapper/Wrapper'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import { WelcomeProps } from '../../types'
import shipGroup from '/shipGroup.png'
import './welcome.css'

const Welcome = ({ setGameState, formData, setFormData }: WelcomeProps) => {
  const context = useContext(Context)

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    const { p1Name, p2Name, playMode } = formData

    if (formData.playMode === 'singlePlayer') {
      setFormData((prev: any) => {
        return { ...prev, p2Name: 'Computer' }
      })
    }
    if (p1Name && p2Name && p1Name !== p2Name) {
      setGameState(GAME_STATE.P1PLACING)
    }
  }

  const handleChange = (e: Event) => {
    const { value, name, type, checked }: any = e.target
    setFormData((prev: any) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  return (
    <div className='welcome'>
      <Header />
      <div className='wrapper'>
        <main className='area welcome-body'>
          <div>
            <h1 className='welcome-title'>Play Battleship</h1>
            <p className='welcome-intro'>
              <FormattedMessage id='welcome.introduction' />
            </p>
            <Box component='form' onSubmit={(e: Event): any => handleSubmit(e)}>
              <TextField
                name='p1Name'
                id='p1Name'
                value={formData.p1Name}
                onChange={() => handleChange}
                autoFocus
                label={<FormattedMessage id='welcome.p1Name' />}
                size='medium'
                fullWidth
                sx={{ mb: 2 }}
              />
              <br />
              {formData.playMode === 'multiPlayer' ? (
                <TextField
                  name='p2Name'
                  id='p2Name'
                  value={formData.p2Name}
                  onChange={() => handleChange}
                  fullWidth
                  label={<FormattedMessage id='welcome.p2Name' />}
                  sx={{ mb: 2 }}
                />
              ) : (
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>
                    {<FormattedMessage id='welcome.difficulty' />}
                  </FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      name='difficulty'
                      value='easy'
                      checked={formData.difficulty === 'easy'}
                      onChange={() => handleChange}
                      label={<FormattedMessage id='welcome.difficulty.easy' />}
                      control={<Radio />}
                    />
                    <FormControlLabel
                      name='difficulty'
                      value='normal'
                      checked={formData.difficulty === 'normal'}
                      onChange={() => handleChange}
                      label={
                        <FormattedMessage id='welcome.difficulty.normal' />
                      }
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
              )}
              <br />
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>
                  <FormattedMessage id='welcome.mode' />
                </FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    name='playMode'
                    value='multiPlayer'
                    checked={formData.playMode === 'multiPlayer'}
                    onChange={() => handleChange}
                    label={<FormattedMessage id='welcome.mode.two' />}
                    control={<Radio />}
                  />
                  <FormControlLabel
                    name='playMode'
                    value='singlePlayer'
                    checked={formData.playMode === 'singlePlayer'}
                    onChange={() => handleChange}
                    label={<FormattedMessage id='welcome.mode.one' />}
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>
                  <FormattedMessage id='welcome.lang' />
                </InputLabel>
                <Select
                  name='language'
                  id='language'
                  value={context.locale}
                  onChange={context.selectLanguage}
                  label={<FormattedMessage id='welcome.lang' />}
                >
                  <MenuItem value='zh-CN'>中文</MenuItem>
                  <MenuItem value='en-US'>English</MenuItem>
                </Select>
              </FormControl>
              <br />
              <Button
                type='submit'
                variant='outlined'
                fullWidth
                color='error'
                sx={{ borderRadius: 5, fontWeight: 700, fontSize: '1.2rem' }}
              >
                {<FormattedMessage id='welcome.start' />}
              </Button>
            </Box>
          </div>
          <div>
            <img src={shipGroup} alt='ship group' />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Welcome
