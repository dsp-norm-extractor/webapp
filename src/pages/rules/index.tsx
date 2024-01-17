// pages/rules/index.tsx

import { TextField, Button, Container } from "@mui/material"
import React, { useState } from "react"
import { parseRules } from "@/helpers/parse-rules"
import { FlexBox } from "@/common/generic/flexbox.styled"
import Link from "next/link"
import { titleToSlug } from "@/helpers/slug"
import router from "next/router"

type ResponseData = {
  backendData: Array<backendData>
  successMsg: boolean
}

type backendData = {
  sentence: string
  frames: object
}

const exampleRules =
  "20 Questions is a classic game that has been redone with new people, places, and things. 20 Questions has creative clues that the whole family can enjoy together. The object of 20 Questions is to correctly identify well-known people, places and things through a series of clues. Kids and parents may not know the answers to the same questions, so this is a great game for the entire family. If you feel the itch to play detective and ask a bunch of questions then play 20 Questions with the entire family today."

const AddRules = () => {
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [responseData, setResponseData] = useState<ResponseData>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    setError("") // clear error message when user types
  }

  const AddExampleRules = () => {
    setText(exampleRules)
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (text.trim() === "") {
      setError("Please enter some text before submitting.")
    } else {
      const parsedRules = parseRules(text)

      // Only clear the text and error if the text is not empty
      setText("")
      setError("")

      // Send the parsed rules data to the API route
      const response = await fetch("/api/handle-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rules: parsedRules }),
      })

      if (!response.ok) {
        setError("The API is not working.")
        return
      }

      const data = await response.json()
      console.log(data)

      // Store sentences and frames in localStorage
      localStorage.setItem(
        "sentencesAndFrames",
        JSON.stringify(
          data.backendData.map(
            ({ sentence, frames }: { sentence: any; frames: object }) => ({
              sentence,
              frames,
            })
          )
        )
      )

      setResponseData(data)

      router.push("/frame-viewer")
    }
  }

  return (
    <div>
      <FlexBox
        flexDirection="column"
        alignItems="flex-end"
        gap={2}>
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
          <Button
            variant="outlined"
            onClick={AddExampleRules}>
            Add example rules
          </Button>

          <Link
            href="/frame-viewer"
            passHref>
            <Button
              variant="contained"
              onClick={handleSubmit}>
              Submit
            </Button>
          </Link>
        </FlexBox>
      </FlexBox>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default AddRules
