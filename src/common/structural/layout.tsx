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

export default function Layout({ children }: React.PropsWithChildren) {
  const theme = useTheme()
  const defaultTheme = createTheme()
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })

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
