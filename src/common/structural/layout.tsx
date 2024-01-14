import React from "react"
import { Box, Toolbar, Typography, useTheme } from "@mui/material"
import Navbar from "./navbar"
import Footer from "./footer"

export default function Layout({ children }: React.PropsWithChildren) {
  const theme = useTheme()

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
          paddingLeft: theme.spacing(30),
          paddingRight: theme.spacing(30),
        }}>
        {children}
      </Box>
      <Footer />
    </>
  )
}
