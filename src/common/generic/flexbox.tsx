import React from "react"
import { Box } from "@mui/material"

type FlexBoxProps = {
  children: React.ReactNode
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  gap?: number
}

const FlexBox = ({
  children,
  direction = "row",
  justify = "flex-start",
  align = "center",
  wrap = "nowrap",
  ...props
}: FlexBoxProps) => {
  return (
    <Box
      display="flex"
      flexDirection={direction}
      justifyContent={justify}
      alignItems={align}
      flexWrap={wrap}
      {...props}>
      {children}
    </Box>
  )
}

export default FlexBox
