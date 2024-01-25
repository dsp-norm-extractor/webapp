import { NextApiRequest, NextApiResponse } from 'next'

export const getSingleFrameHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    let gameName = req.query.game

    if (Array.isArray(gameName)) {
      gameName = gameName[0]
    }

    if (!gameName) {
      res.status(400).json({ success: false, error: 'Game name is required' })
      return
    }

    try {
      const backendUrl = `http://localhost:8000/get_game_details?` + new URLSearchParams({ game_name: gameName }).toString()
      const backendResponse = await fetch(backendUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (backendResponse.ok) {
        // Backend successfully processed the rules
        const backendData = await backendResponse.json()

        res.status(200).json({ success: true, backendData })
      } else {
        // Backend returned an error
        console.error('Backend error:', backendResponse.statusText)
        res.status(500).json({ success: false, error: 'Backend Error' })
      }
    } catch (error) {
      console.error('Error processing rules:', error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}

export default getSingleFrameHandler
