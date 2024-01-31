import { Paper, Container, Grid, Button, DialogTitle, Dialog, DialogContent, LinearProgress, Typography } from '@mui/material'

import { Chart } from '@/components/data/chart'
import Sentences from '@/components/data/sentences'
import { SingleStat } from '@/components/data/single-stat'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ModelData() {
  const [open, setOpen] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  const handleRetrain = () => {
    setOpen(true)
    setLoadingText('Adding new sentences to database')

    setTimeout(() => {
      setLoadingText('Sending request to start process')

      setTimeout(() => {
        setOpen(false)
        toast.success('Retraining started successfully')
      }, 4000)
    }, 2000)
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center" direction="row">
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Single Stat */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <SingleStat />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Sentences />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={4} mt={2}>
          <Button variant="contained" onClick={handleRetrain}>
            Retrain Model
          </Button>
        </Grid>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{loadingText}</DialogTitle>
          <DialogContent>
            <LinearProgress />
            {/* <Typography>{loadingText}</Typography> */}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  )
}
