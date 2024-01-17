// FrameViewer.tsx
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import RuleDetails from "@/components/rule-details/rule-details"
import { Button, Container, Grid, Typography } from "@mui/material"
import { FlexBox } from "@/common/generic/flexbox.styled"
import { Act, Fact, Duty } from "@/types/frames"

const FrameViewer = () => {
  const router = useRouter()
  const [sentencesAndFrames, setSentencesAndFrames] = useState<
    { sentence: string; frames: any }[]
  >([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSentence, setCurrentSentence] = useState<string>("")
  const [frames, setFrames] = useState<{
    acts: Act[]
    facts: Fact[]
    duties: Duty[]
  }>({ acts: [], facts: [], duties: [] })

  useEffect(() => {
    // Retrieve sentences and frames from localStorage
    const storedData = localStorage.getItem("sentencesAndFrames")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setSentencesAndFrames(parsedData)
    }
  }, [])

  useEffect(() => {
    // Fetch frames for the current sentence when currentIndex changes
    if (!router.isReady) return
    const getFramesForCurrentSentence = () => {
      const dataForCurrentSentence = sentencesAndFrames[currentIndex]
      if (dataForCurrentSentence) {
        setCurrentSentence(dataForCurrentSentence.sentence)
        setFrames(dataForCurrentSentence.frames)
      } else {
        // Handle the case where data for the current sentence is not found
        console.error(
          "Data not found for the current sentence:",
          dataForCurrentSentence
        )
      }
    }

    getFramesForCurrentSentence()
  }, [currentIndex, router.isReady, sentencesAndFrames])

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    } else if (
      direction === "next" &&
      currentIndex < sentencesAndFrames.length - 1
    ) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        rowSpacing={3}>
        <Grid item>
          <FlexBox gap={2}>
            <Typography
              variant="h5"
              fontWeight={500}>{`Selected sentence: ${currentIndex + 1} / ${
              sentencesAndFrames.length
            }`}</Typography>
            <Button
              variant="contained"
              onClick={() => navigate("prev")}
              disabled={currentIndex === 0}>
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("next")}
              disabled={currentIndex === sentencesAndFrames.length - 1}>
              Next
            </Button>
          </FlexBox>
        </Grid>
        <RuleDetails
          title={currentSentence}
          frames={frames}
        />
      </Grid>
    </Container>
  )
}

export default FrameViewer
