import styled from '@emotion/styled';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { BreweryInterface } from '../../../utils/types';

interface props {
  data: BreweryInterface | null;
}

const BreadCrumbs: React.FC<props> = ({ data }) => {
  return (
    <Breadcrumbs style={{ marginBottom: '5px' }}>
      <Link color='inherit' href='/'>
        <StyledTypography variant='body2'>Breweries</StyledTypography>
      </Link>
      <Link color='inherit' href={`/breweries/${data?.id}`}>
        <StyledTypography variant='body2'>{!data?.name ? '' : data?.name}</StyledTypography>
      </Link>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;

const StyledTypography = styled(Typography)`
  cursor: pointer;
`;
