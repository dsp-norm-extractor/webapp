import { RuleDetailsProps } from "@/types/frames"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TableContainer,
  Typography,
} from "@mui/material"
import React from "react"
import Title from "../data/title"
const RuleDetails: React.FC<RuleDetailsProps> = ({ title, frames }) => {
  return (
    <>
      <Grid
        item
        xs={12}>
        <Typography
          variant="h6"
          fontWeight={800}>
          {title}
        </Typography>
      </Grid>
      {Object.entries(frames).map(
        (
          [category, data]: any,
          index: number
        ): React.JSX.Element | undefined => {
          if (data.length > 0) {
            return (
              <Grid
                key={index}
                item
                xs={12}>
                <Paper
                  elevation={5}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <TableContainer>
                    <Title>
                      {`${
                        category.charAt(0).toUpperCase() + category.slice(1)
                      }`}
                    </Title>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Key</TableCell>
                          <TableCell style={{ textAlign: "left" }}>
                            Value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((act: any, index: any) => (
                          <React.Fragment key={index}>
                            {Object.entries(act).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell style={{ textAlign: "left" }}>
                                  {JSON.stringify(value)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            )
          }
        }
      )}
    </>
  )
}

export default RuleDetails
