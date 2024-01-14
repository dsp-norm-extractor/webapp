// pages/api/handleList.js

import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Get the list data from the request body
    const list = req.body.list

    // Do something with the list data
    console.log(list)

    // Send a response
    res.status(200).json({ list })
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
