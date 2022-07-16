import styled from '@emotion/styled';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';

interface props {
  err: string;
}

const FALLBACK_MESSAGE = 'There was an unexpected error. Server responded with ';

const DisplayError: React.FC<props> = ({ err }) => {
  return (
    <StyledCard role='alert' sx={{ my: 2 }}>
      <CardContent>
        <Typography variant='h6' sx={{ color: 'error.main' }}>
          ERROR
        </Typography>
        <Typography variant='body1'>
          {FALLBACK_MESSAGE}
          {err}.
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default DisplayError;

const StyledCard = styled(Card)`
  margin-top: 20px;
  display: block;
`;
