// pages/rules/index.tsx

import React, { useState } from 'react'

import { TextField, Button } from '@mui/material'
import Link from 'next/link'
import router from 'next/router'
import toast from 'react-hot-toast'

import { FlexBox } from '@/components/common/generic/flexbox.styled'
import { parseRules } from '@/helpers/parse-rules'

const exampleRules =
  "If the other players can't do so, then on the original player's next turn, they may pair up their 5 with the 2 and the 3. Before gameplay can begin, a caller must be selected. The caller shuffles both decks and then passes out five cards, faced up, to each player."
const AddRules = () => {
  const [text, setText] = useState('')
  const [gameTitle, setGameTitle] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    setGameTitle(event.target.value)
    setError('')
  }

  const handleGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameTitle(event.target.value)
  }

  const AddExampleRules = () => {
    setGameTitle('Monopoly')
    setText(exampleRules)
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (text.trim() === '') {
      setError('Please enter some text before submitting.')
    } else {
      const toastId = toast.loading('Fetching and storing data...')

      const parsedRules = parseRules(text)

      try {
        const response = await fetch('/api/handle-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rules: parsedRules }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'An unknown error occurred')
        }

        const data = await response.json()

        const saveResponse = await fetch('/api/save-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: data.backendData, gameTitle }),
        })

        if (!saveResponse.ok) {
          const errorData = await saveResponse.json()
          throw new Error(errorData.error || 'An unknown error occurred')
        }

        router.push(`/frame-viewer?game=${gameTitle}`)
        toast.success('Data retrieved and stored successfully.', { id: toastId })
      } catch (error: any) {
        setError(error.message)
        toast.error(error.message, { id: toastId })
      }

      setText('')
      setGameTitle('')
    }
  }

  return (
    <div>
      <FlexBox flexDirection="column" alignItems="flex-end" gap={2}>
        <TextField
          id="game-title"
          label="Game Title"
          fullWidth
          value={gameTitle}
          placeholder="Game title"
          onChange={handleGameChange}
        />
        <TextField
          id="outlined-textarea"
          label="Add Game Rules"
          placeholder="Game rule 1. Game rule 2."
          fullWidth
          multiline
          minRows={5}
          onChange={handleChange}
          value={text}
          error={!!error}
        />
        <FlexBox gap={2}>
          <Button variant="outlined" onClick={AddExampleRules}>
            Add example rules
          </Button>

          <Link href="/frame-viewer" passHref>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Link>
        </FlexBox>
      </FlexBox>
    </div>
  )
}

export default AddRules
