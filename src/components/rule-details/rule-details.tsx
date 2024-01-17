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
  Chip,
  Divider,
  Button,
  IconButton,
} from "@mui/material"
import React from "react"
import Title from "../data/title"

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import DeleteIcon from "@mui/icons-material/Delete"
import { FlexBox } from "@/common/generic/flexbox.styled"

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
        <Divider
          textAlign="left"
          sx={{
            mt: 2,
          }}>
          <Chip label="Frames for selected sentence" />
        </Divider>
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
                    <FlexBox
                      alignItems="flex-start"
                      justifyContent="space-between">
                      <Title>
                        {`${
                          category.charAt(0).toUpperCase() + category.slice(1)
                        }`}
                      </Title>
                      <IconButton
                        color="error"
                        aria-label="delete-frame">
                        <DeleteIcon />
                      </IconButton>
                    </FlexBox>

                    <Table>
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
      <Grid
        item
        xs={4}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}>
          Add Frame
        </Button>
      </Grid>
    </>
  )
}

export default RuleDetails
