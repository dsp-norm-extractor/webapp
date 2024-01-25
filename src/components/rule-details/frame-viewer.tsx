// import React, { useState, useEffect } from 'react'

// import PublishIcon from '@mui/icons-material/Publish'
// import SaveIcon from '@mui/icons-material/Save'
// import { Button, ButtonGroup, CircularProgress, Container, Grid, Typography } from '@mui/material'
// import { useRouter } from 'next/router'
// import toast from 'react-hot-toast'

// import { FlexBox } from '@/components/common/generic/flexbox.styled'
// import RuleDetails from '@/components/rule-details/rule-details'
// import { Frames, GameDetails } from '@/types/frames'
// import { Title } from '../common/generic/title'
// import { emptyActFrame, emptyDutyFrame, emptyFactFrame } from './empty-frames'
// import { getLocalStorage } from '@/helpers/local-storage'

// const FrameViewer = () => {
//   const router = useRouter()
//   const { game } = router.query

//   const [gameDetails, setGameDetails] = useState<GameDetails[]>([])
//   const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [frames, setFrames] = useState()

//   useEffect(() => {
//     if (!game || typeof game !== 'string' || !router.isReady) return

//     const fetchGameDetails = async () => {
//       setIsLoading(true)
//       try {
//         const response = await fetch(`/api/get-frame?game=${game}`)
//         if (!response.ok) {
//           throw new Error('Failed to fetch game details')
//         }
//         const data = await response.json()
//         const gameDetailsData = data.backendData.data
//         setGameDetails(gameDetailsData)
//       } catch (err: any) {
//         setError(err.message)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchGameDetails()
//   }, [currentSentenceIndex])

//   const currentGame = gameDetails[0]

//   // useEffect(() => {
//   //   if (currentDetail) {
//   //     // Ensure that the currentDetail has details and they are not empty
//   //     if (currentDetail.details && currentDetail.details.length > 0) {
//   //       console.log({ currentDetail })
//   //       // setFrames(currentDetail.details[0].frames) // Assuming frames are in details[0]
//   //     }
//   //   }
//   // }, [currentDetail])

//   const navigate = (direction: 'prev' | 'next') => {
//     setCurrentSentenceIndex((prevIndex) => {
//       if (direction === 'prev' && prevIndex > 0) {
//         return prevIndex - 1
//       } else if (direction === 'next' && currentGame && prevIndex < currentGame.details.length - 1) {
//         return prevIndex + 1
//       }
//       return prevIndex
//     })
//   }

//   // const handleFrameChange = (sentence: string, updatedFrames: Frames) => {
//   //   const updatedDetails = gameDetails.details.map((detail) =>
//   //     detail.sentence === sentence ? { ...detail, frames: updatedFrames } : detail
//   //   )
//   //   setGameDetails({ ...gameDetails, details: updatedDetails })
//   // }

//   // const handleSaveFrame = () => {
//   //   localStorage.setItem('gameDetails', JSON.stringify(gameDetails))
//   //   toast.success('Frames for all sentences in this game have been saved.')
//   // }

//   // const handleDeleteFrame = (sentence: string, index: number) => {
//   //   const sentenceIndex = gameDetails.details.findIndex((s) => s.sentence === sentence)
//   //   if (sentenceIndex !== -1) {
//   //     const updatedDetails = [...gameDetails.details]

//   //     switch (index) {
//   //       case 0:
//   //         updatedDetails[sentenceIndex].frames.acts = []
//   //         break
//   //       case 1:
//   //         updatedDetails[sentenceIndex].frames.facts = []
//   //         break
//   //       case 2:
//   //         updatedDetails[sentenceIndex].frames.duties = []
//   //         break
//   //       default:
//   //         console.log('Invalid index')
//   //         return
//   //     }

//   //     setGameDetails({ ...gameDetails, details: updatedDetails })
//   //     handleSaveFrame()
//   //     toast.success('Selected frame was deleted.')
//   //     router.reload()
//   //   } else {
//   //     console.log('Sentence not found')
//   //   }
//   // }

//   // const handleAddFrame = (sentence: string, frameType: string) => {
//   //   const sentenceIndex = gameDetails.details.findIndex((s) => s.sentence === sentence)
//   //   if (sentenceIndex !== -1) {
//   //     const sentenceFrames = gameDetails.details[sentenceIndex].frames

//   //     if (!sentenceFrames.acts) sentenceFrames.acts = []
//   //     if (!sentenceFrames.facts) sentenceFrames.facts = []
//   //     if (!sentenceFrames.duties) sentenceFrames.duties = []

//   //     if (
//   //       (frameType === 'act' && sentenceFrames.acts.length > 0) ||
//   //       (frameType === 'fact' && sentenceFrames.facts.length > 0) ||
//   //       (frameType === 'duty' && sentenceFrames.duties.length > 0)
//   //     ) {
//   //       toast.error(`A ${frameType} frame already exists for this sentence.`)
//   //       return
//   //     }

//   //     switch (frameType) {
//   //       case 'act':
//   //         sentenceFrames.acts.push(emptyActFrame)
//   //         break
//   //       case 'fact':
//   //         sentenceFrames.facts.push(emptyFactFrame)
//   //         break
//   //       case 'duty':
//   //         sentenceFrames.duties.push(emptyDutyFrame)
//   //         break
//   //       default:
//   //         console.log('Invalid frameType')
//   //     }

//   //     setGameDetails({ ...gameDetails, details: [...gameDetails.details] })
//   //     handleSaveFrame()
//   //     toast.success(`A frame of type "${frameType}" has been added.`)
//   //     router.reload()
//   //   } else {
//   //     console.log('Sentence not found')
//   //   }
//   //   console.log(sentence, frameType)
//   // }

//   // const handleSubmitToDB = async () => {
//   //   const localStorage = await getLocalStorage('gameDetails')
//   //   console.log(localStorage)

//   //   try {
//   //     const response = await fetch('/api/submit-frame', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ sentencesAndFrames: localStorage }),
//   //     })

//   //     if (!response.ok) {
//   //       throw new Error(`There was an error ${response.status}`)
//   //     }

//   //     const data = await response.json()
//   //   } catch (error: any) {
//   //     console.log(error)
//   //   }
//   // }

//   if (isLoading) {
//     return <CircularProgress />
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>
//   }
//   return (
//     <Container maxWidth="lg">
//       {currentGame ? (
//         <>
//           <Grid container rowSpacing={3}>
//             {/* Game Navigation */}
//             <Grid item xs={12}>
//               <FlexBox gap={3} justifyContent="space-between" aria-label="flex-button-group">
//                 <ButtonGroup variant="outlined">
//                   <Button disabled>{`Game: ${currentSentenceIndex + 1} / ${gameDetails.length}`}</Button>
//                   <Button onClick={() => navigate('prev')} disabled={currentSentenceIndex === 0}>
//                     Previous
//                   </Button>
//                   <Button onClick={() => navigate('next')} disabled={currentSentenceIndex === gameDetails.length - 1}>
//                     Next
//                   </Button>
//                 </ButtonGroup>
//                 <Button variant="text" disabled>
//                   {currentGame?.game}
//                 </Button>
//                 <ButtonGroup variant="contained">
//                   <Button component="label" color="secondary" startIcon={<SaveIcon />}>
//                     Save
//                   </Button>
//                   <Button color="success" startIcon={<PublishIcon />}>
//                     Submit
//                   </Button>
//                 </ButtonGroup>
//               </FlexBox>
//             </Grid>
//             {/* <RuleDetails
//               sentence={currentDetail.details[currentSentenceIndex].sentence}
//               frames={currentDetail.details[currentSentenceIndex].frames}
//               // onFrameEdit={handleFrameChange}
//               // onDelete={handleDeleteFrame}
//               // onFrameAdd={handleAddFrame}
//             /> */}
//           </Grid>
//         </>
//       ) : (
//         <Typography>No game details available.</Typography>
//       )}
//     </Container>
//   )
// }

// export default FrameViewer

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Typography, CircularProgress, Grid, Button, ButtonGroup } from '@mui/material'
import { FlexBox } from '../common/generic/flexbox.styled'

import SaveIcon from '@mui/icons-material/Save'
import PublishIcon from '@mui/icons-material/Publish'
import RuleDetails from './rule-details'
import { Frames, SentenceAndFrames } from '@/types/frames'

// Assuming the GameDetails type
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

const FrameViewer: React.FC = () => {
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

    console.log('Local changes saved')
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
            <Button variant="text" disabled>
              {gameDetails[0]?.game}
            </Button>
            <ButtonGroup variant="contained">
              <Button color="secondary" startIcon={<SaveIcon />} onClick={handleSave}>
                Save
              </Button>
              <Button color="success" startIcon={<PublishIcon />}>
                Submit
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
