import React from "react"
import { Box, Toolbar, Typography, useTheme } from "@mui/material"
import Navbar from "./navbar"
import Footer from "./footer"

export default function Layout({ children }: React.PropsWithChildren) {
  const theme = useTheme() // Add this line to get the theme

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "95%",
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          paddingLeft: theme.spacing(2), // Add padding to match the overall styling
          paddingRight: theme.spacing(2), // Add padding to match the overall styling
        }}>
        {children}
      </Box>
      <Footer />
    </>
  )
}
