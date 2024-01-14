import { Paper, Container, Box, Typography, styled } from "@mui/material"

const StyledFooterPaper = styled(Paper)({
  width: "100%",
  // position: "fixed",
  bottom: 0,
  mt: "auto",
})

const StyledFooterContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
})

const StyledFooterBox = styled(Box)({
  flexGrow: 1,
  justifyContent: "center",
  display: "flex",
})

export default function GuestFooter() {
  return (
    <StyledFooterPaper
      square
      variant="outlined">
      <StyledFooterContainer maxWidth="lg">
        <StyledFooterBox my={1}>SGR</StyledFooterBox>
        <StyledFooterBox mb={2}>
          <Typography variant="caption">
            Copyright 2022 © Simple Game Rules
          </Typography>
        </StyledFooterBox>
      </StyledFooterContainer>
    </StyledFooterPaper>
  )
}
