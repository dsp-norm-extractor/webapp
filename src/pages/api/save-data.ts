// pages/api/save-data.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data, gameTitle } = req.body

    try {
      const backendResponse = await fetch('http://localhost:8000/save_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ game: gameTitle, details: data }]),
      })

      if (!backendResponse.ok) {
        const errorResponse = await backendResponse.json()
        return res
          .status(backendResponse.status)
          .json({ success: false, error: errorResponse.detail || 'An unknown error occurred' })
      }

      const backendData = await backendResponse.json()
      res.status(200).json({ success: true, backendData })
    } catch (error) {
      console.error('Internal Server Error:', error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
