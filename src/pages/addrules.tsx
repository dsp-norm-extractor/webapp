import { TextField, Button } from "@mui/material"
import React, { useState } from "react"
import { parseRules } from "@/helpers/parse-rules"
import FlexBox from "@/common/generic/flexbox"

const exampleRules =
  "20 Questions is a classic game that has been redone with new people, places, and things. 20 Questions has creative clues that the whole family can enjoy together. The object of 20 Questions is to correctly identify well-known people, places and things through a series of clues. Kids and parents may not know the answers to the same questions, so this is a great game for the entire family. If you feel the itch to play detective and ask a bunch of questions then play 20 Questions with the entire family today."

const AddRules = () => {
  const [text, setText] = useState("")
  const [error, setError] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    setError("") // clear error message when user types
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

      // Do something with the response
      const data = await response.json()
      console.log(data)
    }
  }

  const AddExampleRules = () => {
    setText(exampleRules)
  }

  return (
    <div>
      <FlexBox
        direction="column"
        align="flex-end"
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
          <Button
            variant="contained"
            onClick={handleSubmit}>
            Submit
          </Button>
        </FlexBox>
      </FlexBox>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default AddRules
