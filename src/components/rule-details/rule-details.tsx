/* eslint-disable no-unused-vars */
import React, { FC, KeyboardEvent, SyntheticEvent, useRef, useState } from 'react'

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
  InputAdornment,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@mui/material'

import { FlexBox } from '@/components/common/generic/flexbox.styled'
import { Title } from '@/components/common/generic/title'
import { RuleDetailsProps } from '@/types/frames'

const RuleDetails: FC<
  RuleDetailsProps & { onDelete: (sentnce: string, index: number) => void } & {
    onFrameAdd: (sentence: string, frameType: string) => void
  } & {
    onFrameEdit: (sentence: string, frame: number, field: string, fipayload: any) => void
  }
> = ({ title, frames, onDelete, onFrameAdd, onFrameEdit }) => {
  const [open, setOpen] = useState(false)

  const [inputValues, setInputValues] = useState<any>(
    Object.entries(frames).map(() => ({
      acts: {},
      facts: {},
      duties: {},
    })),
  )

  const anchorRef = useRef<HTMLButtonElement>(null)

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={800}>
          {title}
        </Typography>
        <Divider
          textAlign="right"
          sx={{
            mt: 2,
          }}
        >
          <Chip label="Frames" />
        </Divider>
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
                      onClick={() => onDelete(title, index)}
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
                                  <InputLabel htmlFor={`key-value-edit-${frameIndex}-${key}`}>{key}</InputLabel>
                                  <Input
                                    id={`key-value-edit-${frameIndex}-${key}`}
                                    value={inputValues[frameIndex][category][key] || ''}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <Button
                                          id="composition-button"
                                          variant="text"
                                          color="info"
                                          endIcon={<TaskIcon />}
                                          size="small"
                                          onClick={() =>
                                            onFrameEdit(title, frameIndex, key, inputValues[frameIndex][category][key])
                                          }
                                        >
                                          validate
                                        </Button>
                                      </InputAdornment>
                                    }
                                    onChange={(e) =>
                                      setInputValues((inputValues: any) => {
                                        const newInputValues = [...inputValues]
                                        newInputValues[frameIndex][category] = {
                                          ...newInputValues[frameIndex][category],
                                          [key]: e.target.value,
                                        }
                                        return newInputValues
                                      })
                                    }
                                  />
                                  <FormHelperText id="standard-weight-helper-text">{`${key}: ${JSON.stringify(
                                    value,
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
                      <MenuItem onClick={() => onFrameAdd(title, 'act')}>Act</MenuItem>
                      <MenuItem onClick={() => onFrameAdd(title, 'fact')}>Fact</MenuItem>
                      <MenuItem onClick={() => onFrameAdd(title, 'duty')}>Duty</MenuItem>
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
