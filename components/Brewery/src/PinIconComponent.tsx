import React from 'react';

interface props {
  lat: string | null;
  lng: string | null;
  icon: any;
}

const PinIconComponent: React.FC<props> = ({ icon }) => {
  return <div>{icon}</div>;
};

export default PinIconComponent;
