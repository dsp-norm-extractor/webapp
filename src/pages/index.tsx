// pages/index.tsx

import React, { useState } from "react"
import FlexBox from "@/common/generic/flexbox"
import SearchBar from "@/common/generic/search-bar"
import { Chip, Divider } from "@mui/material"
import { useRouter } from "next/router"
import Link from "next/link"
import { initialGames } from "./games/games-list"
import { titleToSlug } from "@/helpers/slug"

const Home: React.FC = () => {
  const [games, setGames] = useState(initialGames)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filteredGames = initialGames.filter((game) =>
      game.title.toLowerCase().includes(term.toLowerCase())
    )
    setGames(filteredGames)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Divider
        sx={{
          mt: 5,
          mb: 5,
        }}>
        <Chip
          label="List of Games"
          size="small"
        />
      </Divider>
      <FlexBox
        gap={2}
        wrap="wrap"
        customStyles={{ flexBasis: "calc(33.333% - 2px)" }}>
        {games.map(({ title, image }) => (
          <Link
            key={title}
            href={`/games/${titleToSlug(title)}`}>
            <div>
              <img
                src={image}
                alt={title}
              />
              <div>{title}</div>
            </div>
          </Link>
        ))}
      </FlexBox>
    </div>
  )
}

export default Home
