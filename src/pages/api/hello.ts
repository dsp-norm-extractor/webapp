/* eslint-disable no-unused-vars */
import { WithId, Document } from 'mongodb'

import clientPromise from '../../../lib/mongodb'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: { json: (arg0: WithId<Document>[]) => void }) => {
  try {
    const client = await clientPromise
    const db = client.db('sample_mflix')

    const movies = await db.collection('movies').find({}).sort({ metacritic: -1 }).limit(10).toArray()

    res.json(movies)
  } catch (e) {
    console.error(e)
  }
}
