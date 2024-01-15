// pages/index.tsx

import React, { useState } from "react"
import SearchBar from "@/common/generic/search-bar"
import { Chip, Divider } from "@mui/material"
import Link from "next/link"
import { initialGames } from "./games/games-list"
import { titleToSlug } from "@/helpers/slug"
import { GameCard } from "@/components/game-card/game-card"
import Masonry from "@mui/lab/Masonry"
import { useMediaQuery } from "@/hooks/use-media-query"

const Home: React.FC = () => {
  const [games, setGames] = useState(initialGames)
  const [searchTerm, setSearchTerm] = useState("")
  const matches = useMediaQuery("(min-width: 768px)")

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

      <Masonry
        columns={matches ? 3 : 1}
        spacing={3}>
        {games.map(({ title, image }) => (
          <Link
            key={title}
            href={`/games/${titleToSlug(title)}`}>
            <GameCard
              image={image}
              title={title}
            />
          </Link>
        ))}
      </Masonry>
    </div>
  )
}

export default Home
