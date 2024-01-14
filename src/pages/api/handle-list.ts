import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { rules } = req.body

      // Process the rules here, for example, log them
      console.log("Received rules:", rules)

      // Respond with a success message
      res.status(200).json({ success: true, rules: rules })
    } catch (error) {
      console.error("Error processing rules:", error)
      res.status(500).json({ success: false, error: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" })
  }
}
