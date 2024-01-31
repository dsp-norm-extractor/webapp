import React, { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import { Container, Typography, CircularProgress, Grid, Button, ButtonGroup } from '@mui/material'
import { FlexBox } from '../common/generic/flexbox.styled'

import SaveIcon from '@mui/icons-material/Save'
import PublishIcon from '@mui/icons-material/Publish'
import RuleDetails from './rule-details'
import { Frames, SentenceAndFrames } from '@/types/frames'
import toast from 'react-hot-toast'

interface GameDetails {
  _id: string
  game: string
  details: {
    sentence: string
    acts: Array<any>
    facts: Array<any>
    duties: Array<any>
  }[]
}

const FrameViewer: FC = () => {
  const [localEdits, setLocalEdits] = useState<SentenceAndFrames | null>(null)
  const [gameDetails, setGameDetails] = useState<GameDetails[]>([])
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const { game } = router.query

  useEffect(() => {
    if (!game || typeof game !== 'string' || !router.isReady) return

    const fetchGameDetails = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/get-frame?game=${encodeURIComponent(game)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch game details')
        }
        const data = await response.json()
        setGameDetails(data.backendData.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGameDetails()
  }, [game, router.isReady])

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentSentenceIndex((prevIndex) => {
      if (direction === 'prev' && prevIndex > 0) {
        return prevIndex - 1
      } else if (direction === 'next' && gameDetails[0] && prevIndex < gameDetails[0].details.length - 1) {
        return prevIndex + 1
      }
      return prevIndex
    })
  }

  const handleLocalEdit = (editedFrames: SentenceAndFrames | null) => {
    setLocalEdits(editedFrames)
  }

  const handleSave = () => {
    if (!localEdits || !gameDetails) return

    const updatedGameDetails: GameDetails[] = JSON.parse(JSON.stringify(gameDetails))

    const currentDetail = updatedGameDetails[0].details[currentSentenceIndex]
    const edits: Frames = localEdits as Frames

    currentDetail.acts = edits.acts || currentDetail.acts
    currentDetail.facts = edits.facts || currentDetail.facts
    currentDetail.duties = edits.duties || currentDetail.duties

    setGameDetails(updatedGameDetails)

    toast('Local changes saved')
  }

  const handleSubmit = async () => {
    const gameId = gameDetails[0]._id
    const updatedFrames = gameDetails[0].details

    try {
      const response = await fetch('/api/update-frame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId, updatedFrames }),
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.detail || 'Failed to update frames')
      }

      toast.success('Frames updated successfully')
    } catch (error) {
      console.error('Error updating frames:', error)
      toast.error('Error updating frames')
    }
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  const currentDetail = gameDetails[0]?.details[currentSentenceIndex]
  const frames = currentDetail ? { acts: currentDetail.acts, facts: currentDetail.facts, duties: currentDetail.duties } : null

  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <FlexBox gap={3} justifyContent="space-between" aria-label="flex-button-group">
            <ButtonGroup variant="outlined">
              <Button disabled>{`Sentence: ${currentSentenceIndex + 1} / ${gameDetails[0]?.details.length}`}</Button>
              <Button onClick={() => navigate('prev')} disabled={currentSentenceIndex === 0}>
                Previous
              </Button>
              <Button onClick={() => navigate('next')} disabled={currentSentenceIndex === gameDetails[0]?.details.length - 1}>
                Next
              </Button>
            </ButtonGroup>
            <Typography variant="h6" fontWeight={900}>
              {gameDetails[0]?.game}
            </Typography>
            <ButtonGroup variant="contained">
              <Button color="secondary" startIcon={<SaveIcon />} onClick={handleSave}>
                Save
              </Button>
              <Button color="success" startIcon={<PublishIcon />} onClick={handleSubmit}>
                Update
              </Button>
            </ButtonGroup>
          </FlexBox>

          {frames && (
            <RuleDetails
              sentence={currentDetail.sentence}
              frames={frames}
              // onDelete={handleDeleteFrame}
              onLocalEdit={handleLocalEdit}
              // onFrameAdd={handleAddFrame}
              // onFrameEdit={handleFrameChange}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default FrameViewer
