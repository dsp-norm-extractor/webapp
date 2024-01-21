import { FC, useState, useEffect } from 'react'
import { Chip, Container, Divider, Grid } from '@mui/material'
import Link from 'next/link'

import SearchBar from '@/components/common/generic/search-bar'
import { GameCard } from '@/components/game-card/game-card'
import { titleToSlug } from '@/helpers/slug'
import { initialGames } from '@/helpers/games-list'

interface Game {
  title: string
  image?: string
}

const Home: FC = () => {
  const [games, setGames] = useState<Game[]>([])
  const [, setSearchTerm] = useState('')

  useEffect(() => {
    const storedGames = localStorage.getItem('gameDetails')
    if (storedGames) {
      const gameDetails = JSON.parse(storedGames)
      setGames([{ title: gameDetails.game, image: `https://picsum.photos/seed/${gameDetails.game}/300/200` }])
    }
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (games.length > 0) {
      const filteredGames = games.filter(({ title }) => title.toLowerCase().includes(term.toLowerCase()))
      setGames(filteredGames)
    }
  }

  return (
    <Container maxWidth="lg">
      <SearchBar onSearch={handleSearch} />
      <Divider
        sx={{
          my: 2,
        }}
      >
        <Chip label="Games" size="small" />
      </Divider>
      <Grid container spacing={4}>
        {games.map(({ title, image }) => (
          <Grid item key={title} xs={12} sm={6} md={4}>
            <Link key={title} href={`/games/${titleToSlug(title)}`}>
              <GameCard image={image ?? 'asd'} title={title} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
