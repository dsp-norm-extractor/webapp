// pages/games/[game].tsx
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"
import { initialGames } from "./games-list"
import { Chip } from "@mui/material"
import FlexBox from "@/common/generic/flexbox"
import { titleToSlug } from "@/helpers/slug"
interface GameProps {
  title: string
  image: string
  rules: Rules[]
}

interface Rules {
  sentence: string
  tag: string
}

const Game: React.FC<GameProps> = ({ title, image, rules }) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running.
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Your HTML content for each game goes here
  return (
    <div>
      <h1>{title}</h1>

      <div>
        <ol>
          {rules.map(({ sentence, tag }, index) => (
            <FlexBox key={index}>
              <li>{sentence}</li>
              <Chip
                label={tag}
                color={
                  tag === "duty"
                    ? "primary"
                    : tag === "act"
                    ? "secondary"
                    : "success"
                }
              />
            </FlexBox>
          ))}
        </ol>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all games
  const paths = initialGames.map((game) => ({
    params: { game: titleToSlug(game.title) },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<GameProps> = async ({ params }) => {
  const game = initialGames.find((g) => titleToSlug(g.title) === params?.game)

  console.log(game)

  if (!game) {
    return {
      notFound: true,
    }
  }

  return {
    props: game,
    revalidate: 1,
  }
}

export default Game
