import React from 'react'

import { Typography, Box, Container } from '@mui/material'

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { Viewer } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'

const AboutPage = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" fontWeight="bold" gutterBottom textAlign="center">
        Simple Game Rules
      </Typography>
      <Viewer fileUrl="assets/poster.pdf" plugins={[defaultLayoutPluginInstance]} />
    </Container>
  )
}

export default AboutPage
