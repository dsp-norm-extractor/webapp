import { useState } from 'react'
import { Chip, Container, Divider, Grid } from '@mui/material'
import Link from 'next/link'

import SearchBar from '@/components/common/generic/search-bar'
import { GameCard } from '@/components/game-card/game-card'
import { titleToSlug } from '@/helpers/slug'
import useFetchGames from '@/hooks/use-fetch-games'
import { GameDetails } from '@/types/frames'

const Home = () => {
  const { backendData, isLoading, error } = useFetchGames()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const games = backendData?.data.map(({ game }: GameDetails) => ({
    title: game,
    image: `https://picsum.photos/seed/${game}/300/200`,
  }))

  const filteredGames =
    games?.filter(({ title }: { title: string }) => title.toLowerCase().includes(searchTerm.toLowerCase())) || []

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Container maxWidth="lg">
      <SearchBar onSearch={handleSearch} />
      <Divider sx={{ my: 5 }}>
        <Chip label="Games" />
      </Divider>
      <Grid container spacing={4}>
        {filteredGames.map(({ title, image }: { title: string; image: string }) => (
          <Grid item key={title} xs={12} sm={6} md={4}>
            <Link href={`/games/${titleToSlug(title)}`}>
              <GameCard image={image ?? 'defaultImageURL'} title={title} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
