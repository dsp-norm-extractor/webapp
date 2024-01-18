import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import RuleDetails from "@/components/rule-details/rule-details"
import { Button, ButtonGroup, Container, Grid } from "@mui/material"
import { FlexBox } from "@/common/generic/flexbox.styled"
import { Act, Fact, Duty } from "@/types/frames"
import SaveIcon from "@mui/icons-material/Save"
import PublishIcon from "@mui/icons-material/Publish"
import toast from "react-hot-toast"

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
  const handleDeleteFrame = (sentence: string, index: number) => {
    // Find the sentence in sentencesAndFrames
    const sentenceIndex = sentencesAndFrames.findIndex(
      (s: { sentence: string; frames: any }) => s.sentence === sentence
    )
    if (sentenceIndex !== -1) {
      // Make a copy of sentencesAndFrames
      const updatedSentencesAndFrames = [...sentencesAndFrames]

      // Depending on the index, set the corresponding frame to an empty array
      switch (index) {
        case 0:
          updatedSentencesAndFrames[sentenceIndex].frames.acts = []
          break
        case 1:
          updatedSentencesAndFrames[sentenceIndex].frames.facts = []
          break
        case 2:
          updatedSentencesAndFrames[sentenceIndex].frames.duties = []
          break
        default:
          console.log("Invalid index")
      }

      // Update the state with the modified copy
      setSentencesAndFrames(updatedSentencesAndFrames)
      toast.success("Selected frame was deleted.")
    } else {
      console.log("Sentence not found")
    }

    console.log(sentencesAndFrames)
  }

  const handleAddFrame = (sentence: string, frameType: string) => {
    console.log(sentence, frameType)

    // Find the sentence in sentencesAndFrames
    const sentenceIndex = sentencesAndFrames.findIndex(
      (s: { sentence: string; frames: any }) => s.sentence === sentence
    )
    if (sentenceIndex !== -1) {
      // Check if a frame of the specified type already exists
      if (
        (frameType === "act" &&
          sentencesAndFrames[sentenceIndex].frames.acts.length > 0) ||
        (frameType === "fact" &&
          sentencesAndFrames[sentenceIndex].frames.facts.length > 0) ||
        (frameType === "duty" &&
          sentencesAndFrames[sentenceIndex].frames.duties.length > 0)
      ) {
        toast.error(`A ${frameType} frame already exists for this sentence.`)
        return
      }

      // Make a copy of sentencesAndFrames
      const updatedSentencesAndFrames = [...sentencesAndFrames]

      // Add a new frame with empty values
      switch (frameType) {
        case "act":
          updatedSentencesAndFrames[sentenceIndex].frames.acts.push({
            act: "",
            actor: "",
            action: "",
            object: "",
            recipient: "",
            preconditions: {
              expression: "",
              operand: false,
            },
            create: [],
            terminate: [],
            sources: [],
            explanation: "",
          })
          break
        case "fact":
          updatedSentencesAndFrames[sentenceIndex].frames.facts.push({
            fact: "",
            function: [],
            sources: [],
            explanation: "",
          })
          break
        case "duty":
          updatedSentencesAndFrames[sentenceIndex].frames.duties.push({
            duty: "",
            dutyHolder: "",
            claimant: "",
            terminatingAct: [],
            creatingAct: [],
            enforcingAct: "",
            sources: [],
          })
          break
        default:
          console.log("Invalid frameType")
      }

      // Update the state with the modified copy
      toast.success(`A frame of type "${frameType}" has been added.`)
      setSentencesAndFrames(updatedSentencesAndFrames)
    } else {
      console.log("Sentence not found")
    }

    console.log(sentence, frameType)
  }

  const handleSave = () => {
    toast.success("Frames for all sentences in this game have been saved.")
  }

  const handleEditFrame = (
    sentence: string,
    frame: number,
    field: string,
    payload: any
  ) => {
    toast(
      `${sentence} for frame ${frame} for ${field} with payload: ${payload}`
    )
  }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        rowSpacing={3}>
        <Grid
          item
          xs={12}>
          <FlexBox
            gap={3}
            justifyContent="space-between"
            aria-label="flex-button-group">
            <ButtonGroup variant="outlined">
              <Button disabled>{`Sentence: ${currentIndex + 1} / ${
                sentencesAndFrames.length
              }`}</Button>
              <Button
                // variant="contained"
                onClick={() => navigate("prev")}
                disabled={currentIndex === 0}>
                Previous
              </Button>
              <Button
                // variant="contained"
                onClick={() => navigate("next")}
                disabled={currentIndex === sentencesAndFrames.length - 1}>
                Next
              </Button>
            </ButtonGroup>
            <ButtonGroup variant="contained">
              <Button
                component="label"
                color="secondary"
                startIcon={<SaveIcon />}
                onClick={handleSave}>
                Save
              </Button>
              <Button
                color="success"
                startIcon={<PublishIcon />}>
                Submit
              </Button>
            </ButtonGroup>
          </FlexBox>
        </Grid>

        <RuleDetails
          title={currentSentence}
          frames={frames}
          onDelete={handleDeleteFrame}
          onFrameAdd={handleAddFrame}
          onFrameEdit={handleEditFrame}
        />
      </Grid>
    </Container>
  )
}

export default FrameViewer
