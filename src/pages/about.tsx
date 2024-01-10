import React, { useEffect, useState } from "react"
import { Typography, Link, Box } from "@mui/material"
import { useSpring, animated } from "react-spring"
import { easings } from "@react-spring/web"

const AboutPage = () => {
  const names = ["Atanas", "Dimitrios", "Ioannis", "Rhea"]

  return (
    <Box>
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom>
        Simple Game Rules
      </Typography>

      <Typography
        variant="h4"
        gutterBottom>
        Our Purpose
      </Typography>

      <Typography
        variant="body1"
        style={{ marginBottom: "20px" }}>
        We do have a purpose.
      </Typography>
    </Box>
  )
}

export default AboutPage
