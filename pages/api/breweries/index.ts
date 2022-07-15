import dbConnect from '../../../libs/db';
import Brewery from '../../../libs/models/breweries';
import type { NextApiRequest, NextApiResponse } from 'next';
dbConnect();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === 'GET') {
    try {
      //arbitrary limit number
      const limit = 7;
      const page = parseInt(req.query.page as string);
      const numberOfBreweries = await Brewery.countDocuments();
      const totalPages = Math.ceil(numberOfBreweries / limit);
      const breweryList = await Brewery.find({})
        .skip(page * limit)
        .limit(limit);
      res.status(200).json({ success: true, page: page + 1, totalPages, data: breweryList });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  }
};
//how I seeded my database
// if (method === 'POST') {
//   try {
//     const { body } = req;
//     for (let i = 0; i < body.length; i++) {
//       const val = body[i];
//       const brewery = new Brewery({
//         id: val.id,
//         name: val.name,
//         brewery_type: val.brewery_type,
//         street: val.street,
//         address_2: val.address_2,
//         address_3: val.address_3,
//         city: val.city,
//         state: val.state,
//         county_province: val.county_province,
//         postal_code: val.postal_code,
//         country: val.country,
//         longitude: val.longitude,
//         latitude: val.latitude,
//         phone: val.phone,
//         website_url: val.website_url,
//         updated_at: val.updated_at,
//         created_at: val.created_at,
//       });

//       Brewery.findOne({ id: val.id }, (err: any, results: any) => {
//         if (results) {
//           return results;
//         } else {
//           brewery.save();
//         }
//       });
//     }
//   } catch (err) {
//     res.status(400).json({ success: false });
//   }
// }
