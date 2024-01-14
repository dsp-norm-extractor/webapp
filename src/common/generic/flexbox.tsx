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
  customStyles?: Record<string, any> // Additional custom styles
}

const FlexBox = ({
  children,
  direction = "row",
  justify = "flex-start",
  align = "center",
  wrap = "nowrap",
  gap = 0,
  customStyles = {},
  ...props
}: FlexBoxProps) => {
  return (
    <Box
      display="flex"
      flexDirection={direction}
      justifyContent={justify}
      alignItems={align}
      flexWrap={wrap}
      gap={gap}
      {...customStyles} // Apply custom styles
      {...props}>
      {children}
    </Box>
  )
}

export default FlexBox
