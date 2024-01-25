// pages/games/[game].tsx
import React from 'react'

import { Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { titleToSlug } from '@/helpers/slug'

import fetchGamesData from '@/helpers/fetch-game-data'

interface GameProps {
  title: string
  image: string
  rules: Rules[]
}

interface Rules {
  sentence: string
  tag: string[]
}

const Game: React.FC<GameProps> = ({ title, rules }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Typography variant="h4" fontWeight={700}>
        {title}
      </Typography>

      {rules.map(({ sentence }, index) => (
        <List>
          <ListItem disablePadding>
            <ListItemButton
              disableGutters
              href={`/frame-viewer?game=${encodeURIComponent(title)}&sentence=${encodeURIComponent(sentence)}`}
            >
              <Chip label={index ?? 'Tag'} sx={{ mr: 2 }} />
              <ListItemText primary={sentence} />
            </ListItemButton>
          </ListItem>
        </List>
      ))}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const games = await fetchGamesData()
  const paths = games.backendData.data.map(({ game }: { game: string }) => ({
    params: { game: titleToSlug(game) },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<GameProps, { game: string }> = async (context) => {
  const games = await fetchGamesData()
  const gameSlug = context.params?.game
  const gameData = games.backendData.data.find(({ game }: { game: string }) => titleToSlug(game) === gameSlug)

  if (!gameData) {
    return { notFound: true }
  }

  const rules = gameData.details.map((detail: { sentence: string }) => {
    return {
      sentence: detail.sentence,
    }
  })

  return {
    props: {
      title: gameData.game,
      image: `https://picsum.photos/seed/${gameData.game}/300/200`,
      rules: rules,
    },
    revalidate: 1,
  }
}
export default Game
