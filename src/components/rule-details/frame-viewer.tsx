import React, { useState, useEffect } from 'react'

import PublishIcon from '@mui/icons-material/Publish'
import SaveIcon from '@mui/icons-material/Save'
import { Button, ButtonGroup, Container, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { FlexBox } from '@/components/common/generic/flexbox.styled'
import RuleDetails from '@/components/rule-details/rule-details'
import { Frames, GameDetails } from '@/types/frames'
import { Title } from '../common/generic/title'
import { emptyActFrame, emptyDutyFrame, emptyFactFrame } from './empty-frames'

const FrameViewer = () => {
  const router = useRouter()
  const [gameDetails, setGameDetails] = useState<GameDetails>({ game: '', details: [] })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSentence, setCurrentSentence] = useState<string>('')
  const [frames, setFrames] = useState<Frames>({ acts: [], facts: [], duties: [] })

  useEffect(() => {
    const storedData = localStorage.getItem('gameDetails')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setGameDetails(parsedData)
    }
  }, [])

  useEffect(() => {
    if (!router.isReady || !gameDetails.details.length) return
    const dataForCurrentSentence = gameDetails.details[currentIndex]
    setCurrentSentence(dataForCurrentSentence.sentence)
    setFrames(dataForCurrentSentence.frames)
  }, [currentIndex, router.isReady, gameDetails])

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    } else if (direction === 'next' && currentIndex < gameDetails.details.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleFrameChange = (sentence: string, updatedFrames: Frames) => {
    const updatedDetails = gameDetails.details.map((detail) =>
      detail.sentence === sentence ? { ...detail, frames: updatedFrames } : detail
    )
    setGameDetails({ ...gameDetails, details: updatedDetails })
  }

  const handleSaveFrame = () => {
    localStorage.setItem('gameDetails', JSON.stringify(gameDetails))
    toast.success('Frames for all sentences in this game have been saved.')
  }

  const handleDeleteFrame = (sentence: string, index: number) => {
    const sentenceIndex = gameDetails.details.findIndex((s) => s.sentence === sentence)
    if (sentenceIndex !== -1) {
      // Make a copy of the details array from gameDetails
      const updatedDetails = [...gameDetails.details]

      // Depending on the index, set the corresponding frame to an empty array
      switch (index) {
        case 0:
          updatedDetails[sentenceIndex].frames.acts = []
          break
        case 1:
          updatedDetails[sentenceIndex].frames.facts = []
          break
        case 2:
          updatedDetails[sentenceIndex].frames.duties = []
          break
        default:
          console.log('Invalid index')
          return // Exit the function if the index is invalid
      }

      // Update the state with the modified GameDetails object
      setGameDetails({ ...gameDetails, details: updatedDetails })
      handleSaveFrame()
      toast.success('Selected frame was deleted.')
    } else {
      console.log('Sentence not found')
    }
  }

  const handleAddFrame = (sentence: string, frameType: string) => {
    console.log(sentence, frameType)

    console.log(sentence, frameType)

    // Find the sentence in gameDetails.details
    const sentenceIndex = gameDetails.details.findIndex((s) => s.sentence === sentence)
    if (sentenceIndex !== -1) {
      const sentenceFrames = gameDetails.details[sentenceIndex].frames

      // Ensure the frame arrays are initialized
      if (!sentenceFrames.acts) sentenceFrames.acts = []
      if (!sentenceFrames.facts) sentenceFrames.facts = []
      if (!sentenceFrames.duties) sentenceFrames.duties = []

      // Check if a frame of the specified type already exists
      if (
        (frameType === 'act' && sentenceFrames.acts.length > 0) ||
        (frameType === 'fact' && sentenceFrames.facts.length > 0) ||
        (frameType === 'duty' && sentenceFrames.duties.length > 0)
      ) {
        toast.error(`A ${frameType} frame already exists for this sentence.`)
        return
      }
      // Add a new frame with empty values
      switch (frameType) {
        case 'act':
          sentenceFrames.acts.push(emptyActFrame)
          break
        case 'fact':
          sentenceFrames.facts.push(emptyFactFrame)
          break
        case 'duty':
          sentenceFrames.duties.push(emptyDutyFrame)
          break
        default:
          console.log('Invalid frameType')
      }

      setGameDetails({ ...gameDetails, details: [...gameDetails.details] })
      handleSaveFrame()
      toast.success(`A frame of type "${frameType}" has been added.`)
    } else {
      console.log('Sentence not found')
    }
    console.log(sentence, frameType)
  }

  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <FlexBox gap={3} justifyContent="space-between" aria-label="flex-button-group">
            <ButtonGroup variant="outlined">
              <Button disabled>{`Sentence: ${currentIndex + 1} / ${gameDetails.details.length}`}</Button>
              <Button onClick={() => navigate('prev')} disabled={currentIndex === 0}>
                Previous
              </Button>
              <Button onClick={() => navigate('next')} disabled={currentIndex === gameDetails.details.length - 1}>
                Next
              </Button>
            </ButtonGroup>
            <Title>{gameDetails.game}</Title>
            <ButtonGroup variant="contained">
              <Button component="label" color="secondary" startIcon={<SaveIcon />} onClick={handleSaveFrame}>
                Save
              </Button>
              <Button color="success" startIcon={<PublishIcon />}>
                Submit
              </Button>
            </ButtonGroup>
          </FlexBox>
        </Grid>

        <RuleDetails
          sentence={currentSentence}
          frames={frames}
          onFrameEdit={handleFrameChange}
          onDelete={handleDeleteFrame}
          onFrameAdd={handleAddFrame}
        />
      </Grid>
    </Container>
  )
}

export default FrameViewer
