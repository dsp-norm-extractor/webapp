import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

export const GameCard = ({
  title,
  image,
}: {
  title: string
  image: string
}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            overflow="hidden"
            textOverflow="ellipsis"
            gutterBottom
            variant="h6"
            fontWeight={600}
            component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
