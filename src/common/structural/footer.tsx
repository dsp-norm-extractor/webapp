import { Paper, Container, Box, Typography } from "@mui/material"

export default function GuestFooter() {
  return (
    <Paper
      sx={{
        width: "100%",
        //   position: "fixed",
        bottom: 0,
        mt: "auto",
      }}
      component="footer"
      square
      variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}>
          SGR
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}>
          <Typography variant="caption">
            Copyright 2022 © Simple Game Rules
          </Typography>
        </Box>
      </Container>
    </Paper>
  )
}
