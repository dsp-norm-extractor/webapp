// search-bar.tsx
import { TextField } from "@mui/material"
import React, { ChangeEvent } from "react"

type SearchBarProps = {
  onSearch: (term: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <TextField
      fullWidth
      label="Search"
      id="fullWidth"
      onChange={handleChange}
    />
  )
}

export default SearchBar
