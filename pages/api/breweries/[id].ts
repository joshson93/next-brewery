import dbConnect from '../../../libs/db';
import Brewery from '../../../libs/models/breweries';
import type { NextApiRequest, NextApiResponse } from 'next';
dbConnect();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  if (method === 'GET') {
    try {
      const brewery = await Brewery.find({ id: id });
      res.status(200).json({ success: true, data: brewery });
    } catch (err) {
      res.status(400).json({ success: false, error: 'Something went wrong.' });
    }
  }
};
