// import * as React from "react"
// import { useTheme } from "@mui/material/styles"
// import { LineChart, axisClasses } from "@mui/x-charts"
// import { ChartsTextStyle } from "@mui/x-charts/ChartsText"

// import { Typography } from "@mui/material"

// // Generate Sales Data
// function createData(
//   time: string,
//   amount?: number
// ): { time: string; amount: number | null } {
//   return { time, amount: amount ?? null }
// }

// const data = [
//   createData("10 Jan", 0),
//   createData("12 Jan", 20),
//   createData("14 Jan", 25),
//   createData("16 Jan", 30),
//   createData("18 Jan", 30),
//   createData("20 Jan", 70),
//   createData("22 Jan", 89),
//   createData("24 Jan", 89),
//   createData("26 Jan", 98),
// ]

// export default function Chart() {
//   const theme = useTheme()

//   return (
//     <React.Fragment>
//       <Typography
//         component="h2"
//         variant="h6"
//         color="primary"
//         gutterBottom>
//         Model Accuracy
//       </Typography>
//       <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
//         <LineChart
//           dataset={data}
//           margin={{
//             top: 16,
//             right: 20,
//             left: 70,
//             bottom: 30,
//           }}
//           xAxis={[
//             {
//               scaleType: "point",
//               dataKey: "time",
//               tickNumber: 2,
//               tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
//             },
//           ]}
//           yAxis={[
//             {
//               label: "% Accuracy",
//               labelStyle: {
//                 ...(theme.typography.body1 as ChartsTextStyle),
//                 fill: theme.palette.text.primary,
//               },
//               tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
//               max: 100,
//               tickNumber: 3,
//             },
//           ]}
//           series={[
//             {
//               dataKey: "amount",
//               showMark: false,
//               color: theme.palette.primary.light,
//             },
//           ]}
//           sx={{
//             [`.${axisClasses.root} line`]: {
//               stroke: theme.palette.text.secondary,
//             },
//             [`.${axisClasses.root} text`]: {
//               fill: theme.palette.text.secondary,
//             },
//             [`& .${axisClasses.left} .${axisClasses.label}`]: {
//               transform: "translateX(-25px)",
//             },
//           }}
//         />
//       </div>
//     </React.Fragment>
//   )
// }

import * as React from "react"
import { useTheme } from "@mui/material/styles"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts"
import { Typography } from "@mui/material"
import Title from "./title"

// Generate Sales Data
function createData(time: string, amount: number) {
  return { time, amount }
}

const data = [
  createData("10 Jan", 0),
  createData("12 Jan", 20),
  createData("14 Jan", 25),
  createData("16 Jan", 30),
  createData("18 Jan", 30),
  createData("20 Jan", 70),
  createData("22 Jan", 89),
  createData("24 Jan", 89),
  createData("26 Jan", 98),
]

export default function Chart() {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Title>Model Accuracy</Title>

      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}>
              % Accuracy
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
