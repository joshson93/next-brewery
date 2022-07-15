import { TableRow, TableCell } from '@mui/material';

import React from 'react';
import { BreweryInterface } from '../../../../utils/types';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
interface props {
  row: BreweryInterface;
}

const BreweryRow: React.FC<props> = ({ row }) => {
  const router = useRouter();
  const goToSpecificBrewery = (id: string) => {
    router.push(`/breweries/${id}`);
  };

  return (
    <StyledRow onClick={() => goToSpecificBrewery(row.id)}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.brewery_type}</TableCell>
      <TableCell>{`${row.street !== null ? row.street + ',' : ''} ${row.city + ','} ${
        row.state + ','
      } ${row.postal_code}`}</TableCell>
      <TableCell>
        <StyledLink href={`${row.website_url}`} rel='noopener noreferrer' target='blank'>
          {row.website_url}
        </StyledLink>
      </TableCell>
    </StyledRow>
  );
};

export default BreweryRow;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    background-color: #cdcdcd;
  }
`;
