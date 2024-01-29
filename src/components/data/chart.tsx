import * as React from 'react'

import { useTheme } from '@mui/material/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

import { Title } from '@/components/common/generic/title'

// Generate Sales Data
function createData(time: string, amount: number) {
  return { time, amount }
}

const data = [createData('December', 0), createData('13 Jan', 0.62), createData('26 Jan', 0.8)]

export const Chart = () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Title>Training Data</Title>

      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} style={theme.typography.body2} />
          <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Accuracy Score
            </Label>
          </YAxis>
          <Tooltip />

          <Line isAnimationActive={true} type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
