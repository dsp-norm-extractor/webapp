import { Card, CardContent, styled } from "@mui/material"

interface BackgroundImageProps {
  image: string
}

export const StyledCard = styled(Card)({
  position: "relative",
  width: 300,
  height: 300,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
})

export const StyledCardContent = styled(CardContent)({
  position: "relative",
  background: "white",
  padding: 20,
  boxSizing: "border-box",
})

export const BackgroundImage = styled("div")<BackgroundImageProps>(
  ({ image }) => ({
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
  })
)
