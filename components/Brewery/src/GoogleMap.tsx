import React from 'react';
import GoogleMapReact from 'google-map-react';
import { BreweryInterface } from '../../../utils/types';

import PinIconComponent from './PinIconComponent';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface props {
  data: BreweryInterface;
}

const GoogleMap: React.FC<props> = ({ data }) => {
  const defaultProps = {
    center: {
      //coordinates for philadelphia
      lat: 39.952583,
      lng: -75.165222,
    },
    zoom: 13,
  };

  return (
    <div style={{ height: '60vh', width: '95%' }}>
      <GoogleMapReact defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
        <PinIconComponent
          lat={data?.latitude}
          lng={data?.longitude}
          icon={<LocationOnIcon color='error' />}
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
