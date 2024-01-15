import React, { useEffect, useState } from "react"
import { Box, Toolbar, Typography, useTheme } from "@mui/material"
import Navbar from "./navbar"
import Footer from "./footer"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Layout({ children }: React.PropsWithChildren) {
  const theme = useTheme()
  const match = useMediaQuery("(min-width: 1200px)")

  useEffect(() => {
    const handleResize = () => {}

    window.addEventListener("resize", handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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
          paddingLeft: !match ? theme.spacing(2) : theme.spacing(25),
          paddingRight: !match ? theme.spacing(2) : theme.spacing(25),
        }}>
        {children}
      </Box>

      <Footer />
    </>
  )
}
