import * as React from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { Title } from '@/components/common/generic/title'

// Generate Data for Classification Report
function createData(category: string, precision: string | number, recall: string | number, f1Score: number, support: number) {
  return { category, precision, recall, f1Score, support }
}

const rows = [
  // createData('fact', 0.93, 0.93, 0.93, 72),
  // createData('act', 0.8, 0.8, 0.8, 60),
  // createData('duty', 0.67, 0.67, 0.67, 26),
  createData('accuracy', '', '', 0.85, 158),
  createData('macro avg', 0.8, 0.8, 0.8, 158),
  createData('weighted avg', 0.85, 0.85, 0.85, 158),
]

export default function ClassificationReport() {
  return (
    <React.Fragment>
      <Title>Classification Metrics</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell variant="head">Category</TableCell>
            <TableCell align="right">Precision</TableCell>
            <TableCell align="right">Recall</TableCell>
            <TableCell align="right">F1-Score</TableCell>
            <TableCell align="right">Support</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ category, precision, recall, f1Score, support }) => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
              <TableCell align="right">{precision}</TableCell>
              <TableCell align="right">{recall}</TableCell>
              <TableCell align="right">{f1Score}</TableCell>
              <TableCell align="right">{support}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
