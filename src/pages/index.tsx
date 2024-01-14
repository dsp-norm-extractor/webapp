import React, { useState } from "react"
import FlexBox from "@/common/generic/flexbox"
import { GameCard } from "@/components/game-card/game-card"
import SearchBar from "@/common/generic/search-bar"

const initialGames = [
  {
    title: "Catan",
    image: "https://picsum.photos/seed/Catan/200/300",
  },
  {
    title: "Ticket to Ride",
    image: "https://picsum.photos/seed/Ticket-to-Ride/200/300",
  },
  {
    title: "Carcassonne",
    image: "https://picsum.photos/seed/Carcassonne/200/300",
  },
  {
    title: "Pandemic",
    image: "https://picsum.photos/seed/Pandemic/200/300",
  },
  {
    title: "Codenames",
    image: "https://picsum.photos/seed/Codenames/200/300",
  },
  {
    title: "Splendor",
    image: "https://picsum.photos/seed/Splendor/200/300",
  },
  {
    title: "7 Wonders",
    image: "https://picsum.photos/seed/7-Wonders/200/300",
  },
  {
    title: "Dominion",
    image: "https://picsum.photos/seed/Dominion/200/300",
  },
  {
    title: "Risk",
    image: "https://picsum.photos/seed/Risk/200/300",
  },
  {
    title: "Monopoly",
    image: "https://picsum.photos/seed/Monopoly/200/300",
  },
]

export default function Home() {
  const [games, setGames] = useState(initialGames)
  const [searchTerm, setSearchTerm] = useState("")

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
      <FlexBox>
        {games.map(({ title, image }) => (
          <GameCard
            key={title}
            title={title}
            image={image}
          />
        ))}
      </FlexBox>
    </div>
  )
}
