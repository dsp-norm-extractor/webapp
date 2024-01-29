// pages/api/update-frame.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { gameId, updatedFrames } = req.body

      console.log(JSON.stringify({ gameId, updatedFrames }))

      const backendResponse = await fetch('http://localhost:8000/update_game_frames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_id: gameId, updated_details: updatedFrames }),
      })

      if (!backendResponse.ok) {
        const errorResponse = await backendResponse.json()
        return res.status(backendResponse.status).json(errorResponse)
      }

      const backendData = await backendResponse.json()
      res.status(200).json(backendData)
    } catch (error) {
      console.error('Internal Server Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
