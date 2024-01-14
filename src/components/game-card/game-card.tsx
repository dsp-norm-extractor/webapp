import React from "react"
import { Card, CardContent, Typography } from "@mui/material"
import { styled } from "@mui/material"
import {
  StyledCard,
  BackgroundImage,
  StyledCardContent,
} from "./game-card.styled"

export const GameCard = ({
  title,
  image,
}: {
  title: string
  image: string
}) => {
  return (
    <StyledCard>
      <BackgroundImage image={image} />
      <StyledCardContent>
        <Typography variant="h5">{title}</Typography>
      </StyledCardContent>
    </StyledCard>
  )
}
