import { NextApiRequest, NextApiResponse } from 'next'

export const getFramesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const backendUrl = 'http://localhost:8000/get_frames'
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

export default getFramesHandler
