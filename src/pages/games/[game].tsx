// pages/games/[game].tsx
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"
import { initialGames } from "./games-list"
import { Chip } from "@mui/material"
import FlexBox from "@/common/generic/flexbox"
import { titleToSlug } from "@/helpers/slug"
import BasicModal from "@/components/modal/modal"
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
    <div>
      <h1>{title}</h1>
      <BasicModal />
      <div>
        <ol>
          {rules.map(({ sentence, tag }, index) => (
            <FlexBox key={index}>
              <li>{sentence}</li>
              {Array.isArray(tag) ? (
                tag.map((singltag) => (
                  <Chip
                    key={singltag}
                    label={singltag}
                    color={
                      singltag === "duty"
                        ? "primary"
                        : singltag === "act"
                        ? "secondary"
                        : "success"
                    }
                  />
                ))
              ) : (
                // Handle the case where tag is not an array, e.g., display an error message
                <div>Invalid tag format for rule {index + 1}</div>
              )}
            </FlexBox>
          ))}
        </ol>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all games
  const paths = initialGames.map(({ title }) => ({
    params: { game: titleToSlug(title) },
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