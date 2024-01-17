// components/AccordionUsage.tsx
import React from "react"
import AccordionMui from "@mui/material/Accordion" // Rename to avoid conflict
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"
import RuleDetails from "./rule-details"

type FramesData = Array<{
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
}>

type AccordionUsageProps = {
  framesData: FramesData
}

const AccordionUsage: React.FC<AccordionUsageProps> = ({ framesData }) => {
  return (
    <div>
      {framesData.map((frames, index) => (
        <AccordionMui key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}>
            Accordion {index + 1}
          </AccordionSummary>
          <AccordionDetails>
            <RuleDetails
              title={`Accordion ${index + 1}`}
              frames={frames}
            />
          </AccordionDetails>
        </AccordionMui>
      ))}
      {/* Example Accordion with Actions */}
      <AccordionMui defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-actions-content"
          id="panel-actions-header">
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          <RuleDetails
            title="Accordion Actions"
            frames={{}}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </AccordionMui>
    </div>
  )
}

export default AccordionUsage
