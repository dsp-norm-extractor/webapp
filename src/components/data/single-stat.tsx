import * as React from "react"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Title from "./title"

export default function SingleStat() {
  return (
    <React.Fragment>
      <Title>Highlights</Title>
      <Typography
        component="p"
        variant="h4">
        5128
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ flex: 1 }}>
        Sentences used in training
      </Typography>
      {/* SPLIT */}

      <Typography
        component="p"
        variant="h4">
        9761
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ flex: 1 }}>
        Sentences in the database
      </Typography>
    </React.Fragment>
  )
}
