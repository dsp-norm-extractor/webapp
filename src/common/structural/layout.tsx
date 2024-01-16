import {
  Box,
  Container,
  ThemeProvider,
  Toolbar,
  createTheme,
  useTheme,
} from "@mui/material"
import Navbar from "./navbar"
import Footer from "./footer"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Layout({ children }: React.PropsWithChildren) {
  const theme = useTheme()
  const match = useMediaQuery("(min-width: 1200px)")
  const defaultTheme = createTheme()

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Toolbar />
      <Box
        style={{
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(6),
        }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
