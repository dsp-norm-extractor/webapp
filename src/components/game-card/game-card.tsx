import React from "react"
import { Card, CardContent, Typography } from "@mui/material"
import { styled } from "@mui/material"

interface BackgroundImageProps {
  image: string
}

const StyledCard = styled(Card)({
  position: "relative",
  width: 300,
  height: 300,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
})

const StyledCardContent = styled(CardContent)({
  position: "relative",
  background: "white",
  padding: 20,
  boxSizing: "border-box",
})

const BackgroundImage = styled("div")<BackgroundImageProps>(({ image }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at center, transparent, black)",
  },
}))

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
