import mongoose from 'mongoose';
import { BreweryInterface } from '../../utils/types';

const BrewSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  brewery_type: { type: String },
  street: { type: String },
  address_2: { type: String },
  address_3: { type: String },
  city: { type: String },
  state: { type: String },
  county_province: { type: String },
  postal_code: { type: String },
  country: { type: String },
  longitude: { type: String },
  latitude: { type: String },
  phone: { type: String },
  website_url: { type: String },
  updated_at: { type: String },
  created_at: { type: String },
});

export default mongoose.models['Brewery'] ||
  mongoose.model<BreweryInterface>('Brewery', BrewSchema);
