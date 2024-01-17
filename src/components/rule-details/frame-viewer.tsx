// FrameViewer.tsx
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import RuleDetails from "@/components/rule-details/rule-details"
import { Button, Container } from "@mui/material"
import { FlexBox } from "@/common/generic/flexbox.styled"

const FrameViewer = () => {
  const router = useRouter()
  const [sentencesAndFrames, setSentencesAndFrames] = useState<
    { sentence: string; frames: { [key: string]: any } }[]
  >([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSentence, setCurrentSentence] = useState<string>("")
  const [frames, setFrames] = useState<{ [key: string]: string }>({})

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
    <Container>
      <RuleDetails
        title={currentSentence}
        frames={frames}
      />
      <FlexBox gap={2}>
        <Button
          variant="contained"
          onClick={() => navigate("prev")}>
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("next")}>
          Next
        </Button>
      </FlexBox>
    </Container>
  )
}

export default FrameViewer
