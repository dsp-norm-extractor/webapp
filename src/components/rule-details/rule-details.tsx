// components/RuleDetails.tsx
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material"
import React from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { FlexBox } from "@/common/generic/flexbox.styled"

type RuleDetailsProps = {
  title: string
  frames: {
    acts: Array<{
      act: string
      actor: string
      action: string
      object: string
      recipient: string
      preconditions: {
        expression: string
        operand: boolean
      }
      create: string[]
      terminate: string[]
      sources: string[]
      explanation: string
    }>
    facts: Array<{
      fact: string
      function: string[]
      sources: string[]
      explanation: string
    }>
    duties: Array<{
      duty: string
      dutyHolder: string
      claimant: string
      terminatingAct: string[]
      creatingAct: string[]
      enforcingAct: string
      sources: string[]
    }>
  }
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ title, frames }) => {
  return (
    <div>
      <Typography
        variant="h5"
        fontWeight={800}>
        {title}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mb: 3 }}>
        {Object.entries(frames).map(([category, data]) => (
          // eslint-disable-next-line react/jsx-key
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header">
              {category}
            </AccordionSummary>
            <AccordionDetails>
              {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              <TableContainer component={Paper}>
                <Table aria-label="act table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Key</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((act, index) => (
                      <React.Fragment key={index}>
                        {Object.entries(act).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{JSON.stringify(value)}</TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </TableContainer>
    </div>
  )
}

export default RuleDetails
