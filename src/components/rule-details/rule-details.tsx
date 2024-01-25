/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FC, KeyboardEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import TaskIcon from '@mui/icons-material/Task'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Grid,
  TableContainer,
  Typography,
  Chip,
  Divider,
  Button,
  MenuItem,
  ClickAwayListener,
  Grow,
  MenuList,
  Popper,
  FormControl,
  Input,
  FormHelperText,
} from '@mui/material'

import { FlexBox } from '@/components/common/generic/flexbox.styled'
import { Title } from '@/components/common/generic/title'
import { RuleDetailsProps } from '@/types/frames'
import { emptyActFrame, emptyFactFrame, emptyDutyFrame } from './empty-frames'

const RuleDetails = ({ sentence, frames, onDelete, onFrameAdd, onLocalEdit }: any) => {
  const [open, setOpen] = useState(false)
  const [inputValues, setInputValues] = useState(frames)

  const anchorRef = useRef<HTMLButtonElement>(null)

  // Logic for Add Frame Popover
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleListKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  // Logic for handling frame value changes
  useEffect(() => {
    setInputValues(frames)
  }, [frames])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: string,
    frameIndex: number,
    key: string
  ) => {
    const newValue = event.target.value

    const updatedInputValues = { ...inputValues }
    if (!updatedInputValues[category]) {
      updatedInputValues[category] = []
    }
    if (!updatedInputValues[category][frameIndex]) {
      updatedInputValues[category][frameIndex] = {}
    }
    updatedInputValues[category][frameIndex][key] = newValue

    setInputValues(updatedInputValues)

    // Optionally, propagate changes upwards
    if (onLocalEdit) {
      onLocalEdit(inputValues)
    }
  }

  // LOGIC FOR HANDLING FRAME ADD
  const handleAddFrame = (frameType: string) => {
    const updatedInputValues = { ...inputValues }

    // Check if a frame of this type already exists
    if (updatedInputValues[frameType] && updatedInputValues[frameType].length > 0) {
      alert(`A frame of type '${frameType}' already exists for this sentence.`)
      return
    }

    let newFrame
    switch (frameType) {
      case 'acts':
        newFrame = { ...emptyActFrame }
        break
      case 'facts':
        newFrame = { ...emptyFactFrame }
        break
      case 'duties':
        newFrame = { ...emptyDutyFrame }
        break
      default:
        console.error('Invalid frame type')
        return
    }

    if (!updatedInputValues[frameType]) {
      updatedInputValues[frameType] = []
    }

    updatedInputValues[frameType].push(newFrame)
    setInputValues(updatedInputValues)

    // Propagate the addition of a new frame upwards
    if (onLocalEdit) {
      onLocalEdit(updatedInputValues)
    }
  }

  // LOGIC FOR DELETING A FRAME
  const handleDeleteFrame = (category: string, frameIndex: number) => {
    const updatedInputValues = { ...inputValues }
    if (updatedInputValues[category] && updatedInputValues[category].length > frameIndex) {
      updatedInputValues[category].splice(frameIndex, 1) // Remove the frame at frameIndex
      setInputValues(updatedInputValues)

      // Propagate the deletion of the frame upwards
      if (onLocalEdit) {
        onLocalEdit(updatedInputValues)
      }
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="body1" fontWeight={800}>
          {sentence}
        </Typography>
      </Grid>
      {Object.entries(frames).map(([category, data]: any, index: number): React.JSX.Element | undefined => {
        if (data.length > 0) {
          return (
            <Grid key={index} item xs={12}>
              <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <TableContainer>
                  <FlexBox alignItems="flex-start" justifyContent="space-between">
                    <Title>{`${category.charAt(0).toUpperCase() + category.slice(1)}`}</Title>
                    <Button
                      component="label"
                      color="error"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteFrame(category, index)}
                    >
                      Delete
                    </Button>
                  </FlexBox>

                  <Table>
                    <TableBody>
                      {data.map((frame: any, frameIndex: any) => (
                        <React.Fragment key={frameIndex}>
                          {Object.entries(frame).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell>{key}</TableCell>
                              <TableCell>
                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                  <Input value={value} onChange={(event) => handleChange(event, category, frameIndex, key)} />
                                  <FormHelperText id="standard-weight-helper-text">{`Current Value for: ${key}: ${JSON.stringify(
                                    value
                                  )}`}</FormHelperText>
                                </FormControl>
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
      })}
      <Grid item xs={12} justifyContent="center">
        <FlexBox justifyContent="center">
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
          >
            Add Frame
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={() => handleAddFrame('acts')}>Act</MenuItem>
                      <MenuItem onClick={() => handleAddFrame('facts')}>Fact</MenuItem>
                      <MenuItem onClick={() => handleAddFrame('duties')}>Duty</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </FlexBox>
      </Grid>
    </>
  )
}

export default RuleDetails
