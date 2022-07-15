import dbConnect from '../../libs/db';
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    res.status(200).json({ connection: 'connection established' });
  } catch (err) {
    res.status(500).json({ connection: 'failed' });
  }
};
