import { TextField, Button, Box, useTheme } from "@mui/material"
import clientPromise from "../../lib/mongodb"
import React, { useState } from "react"

const ApiPage = ({ movies }: any) => {
  const [text, setText] = useState("")
  const [list, setList] = useState<string[]>([])
  const [error, setError] = useState("")

  const theme = useTheme()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    setError("") // clear error message when user types
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (text.trim() === "") {
      setError("Please enter some text before submitting.")
    } else {
      setList((oldList) => [...oldList, text])
      setText("")
    }
  }

  const handleSubmitAll = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    // Send the list data to the API route
    const response = await fetch("/api/handle-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list }),
    })

    // Do something with the response
    const data = await response.json()
    console.log(data)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      if (text.trim() === "") {
        setError("Please enter some text before submitting.")
      } else {
        setList((oldList) => [...oldList, text])
        setText("")
      }
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
        }}>
        <TextField
          fullWidth
          label="Prompt"
          id="fullWidth"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}>
          Enter
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmitAll}>
          Submit All
        </Button>
      </Box>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// export async function getServerSideProps() {}

export default ApiPage
