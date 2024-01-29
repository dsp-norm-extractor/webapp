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
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fio.dropinblog.com%2Fuploaded%2Fblogs%2F34241432%2Ffiles%2Ffeatured%2Fhow-to-teach-a-board-game.jpg&f=1&nofb=1&ipt=991e1bd5dd5a18ed0ad140029a8ad7b873309383f5d9fe150f7571ed930d9977&ipo=images',
  }))

  const imageOptions = [
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fio.dropinblog.com%2Fuploaded%2Fblogs%2F34241432%2Ffiles%2Ffeatured%2Fhow-to-teach-a-board-game.jpg&f=1&nofb=1&ipt=991e1bd5dd5a18ed0ad140029a8ad7b873309383f5d9fe150f7571ed930d9977&ipo=images',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnewywithkids.com.au%2Fwp-content%2Fuploads%2F2019%2F09%2FFamilyBestBoardGames.jpg&f=1&nofb=1&ipt=37bd9157c7e2dedbe790c6878c76101c3e6cc159074c331d15c299366c35a6f3&ipo=images',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.parentmap.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1180x660_scaled_cropped%2Fpublic%2F2020-03%2Fboard-games-famil-iStock_000020528687XXLarge-sm_1.jpg%3Fitok%3DKKJtU1b2&f=1&nofb=1&ipt=c0c1b6caa828b082e8ded68842735c4e9f3309af9af8dc80f2c74793e6c3ce79&ipo=images',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgix.bustle.com%2Fuploads%2Fimage%2F2019%2F1%2F18%2Fc3def9ff-df29-4463-8c14-ad1bc89188e5-boar-game-for-large-groups.jpg%3Fw%3D970%26h%3D546%26fit%3Dcrop%26crop%3Dfaces%26auto%3Dformat%26q%3D70&f=1&nofb=1&ipt=8c3d90ba466e5d1d700c990c3d05495c3cf1087edf16b544aad0981242530525&ipo=images',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.projectboldlife.com%2Fimages%2F2019%2F02%2Ffun-board-games-for-adults-feature.jpg&f=1&nofb=1&ipt=992dcd3e8026603a67a3e4a1df035d68495a3d5dd6b0bb8fe9f14f31a6c5a103&ipo=images',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fman-people-board-game-play-color-playing-together-leisure-toy-board-game-competition-cards-fun-hands-strategy-pawn-history-games-entertainment-dice-pieces-indoor-games-and-sports-settlers-of-catan-table-game-923807.jpg&f=1&nofb=1&ipt=23142ec77b600794f8c7836a4a47733ca6aab1950bbdc8992ca6ffd731a428bc&ipo=images',
  ]
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageOptions.length)
    return imageOptions[randomIndex]
  }

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
        {filteredGames.map(({ title }: { title: string }) => (
          <Grid item key={title} xs={12} sm={6} md={4}>
            <Link href={`/games/${titleToSlug(title)}`}>
              <GameCard image={getRandomImage()} title={title} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
