import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { Card, Tooltip, Typography, Divider } from '@mui/material';
import { BreweryInterface } from '../../utils/types';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import CallIcon from '@mui/icons-material/Call';
import GoogleMap from './src/GoogleMap';
import LinkIcon from '@mui/icons-material/Link';
import styled from '@emotion/styled';
import BreadCrumbs from './src/BreadCrumbs';
import { BASE_URL } from '../BreweryTable/src/constants';
import LoadingState from './src/LoadingState';
import DisplayError from '../DisplayError';
import { CARD_HEADER, NO_COORDINATES_MESSAGE, PIN_MESSAGE } from './src/constants';
const Brewery: React.FC = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const [data, setData] = useState<null | BreweryInterface>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const noErrorsAndLoadingState = !loading && !error;
  const dataAndNoError = data && !error;

  useEffect(() => {
    if (!isReady) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${query.id}`);
        if (response.status === 200) {
          setData(response.data.data[0]);
          setError(false);
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(true);
          setLoading(false);
          setErrorMessage(err.message);
        }
      }
    };
    fetchData();
    //prevents the query from being undefined on initial render
  }, [query.id, isReady]);

  return (
    <>
      <EntireContainer>
        {loading && LoadingState()}
        {noErrorsAndLoadingState && (
          <>
            <BreadCrumbs data={data} />
            <Divider style={{ width: '95%' }} />
            <Typography style={{ marginTop: '25px' }} component='div' variant='h3'>
              {data?.name}
            </Typography>
            <StyledCard>
              <CardHeader>{CARD_HEADER}</CardHeader>
              <InformationContainer>
                <StyledTooltip title='Address'>
                  <PinDropIcon fontSize='small' />
                </StyledTooltip>
                <Typography component='span' variant='body2'>{`${
                  data?.street !== null ? data?.street + ',' : ''
                } ${data?.city + ','} ${data?.state + ','} ${data?.postal_code}`}</Typography>
              </InformationContainer>
              <InformationContainer>
                <StyledTooltip title='Brewery Type'>
                  <LocalDrinkIcon fontSize='small' />
                </StyledTooltip>
                <Typography component='span' variant='body2'>
                  {data?.brewery_type}
                </Typography>
              </InformationContainer>
              {data?.phone && (
                <InformationContainer>
                  <StyledTooltip title='Phone Number'>
                    <CallIcon fontSize='small' />
                  </StyledTooltip>
                  <Typography component='span' variant='body2'>
                    {data?.phone}
                  </Typography>
                </InformationContainer>
              )}
              {data?.website_url && (
                <InformationContainer style={{ marginBottom: '10px' }}>
                  <StyledTooltip title='Website'>
                    <LinkIcon fontSize='small' />
                  </StyledTooltip>
                  <Typography component='span' variant='body2'>
                    <StyledLink
                      href={`${data?.website_url}`}
                      rel='noopener noreferrer'
                      target='blank'>
                      {data?.website_url}
                    </StyledLink>
                  </Typography>
                </InformationContainer>
              )}
            </StyledCard>
          </>
        )}
        {error && !loading && <DisplayError err={errorMessage} />}
      </EntireContainer>
      {dataAndNoError && (
        <GoogleMapContainer>
          <Message variant='body2'>
            {!data?.latitude && !data?.longitude ? NO_COORDINATES_MESSAGE : PIN_MESSAGE}
          </Message>
          <GoogleMap data={data} />
        </GoogleMapContainer>
      )}
    </>
  );
};

export default Brewery;

const StyledCard = styled(Card)`
  margin-top: 50px;
  width: 95%;
  padding: 5px;
`;

const GoogleMapContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 25px;
  margin-left: 5%;
`;

const EntireContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  margin-top: 25px;
`;

const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;

const Message = styled(Typography)`
  margin-top: 25px;
  text-align: center;
`;

const StyledTooltip = styled(Tooltip)`
  margin-right: 5px;
`;

const CardHeader = styled.label`
  margin-left: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
