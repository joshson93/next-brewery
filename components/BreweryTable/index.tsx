import styled from '@emotion/styled';
import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BreweryInterface } from '../../utils/types';
import BreweryRow from './src/BreweryRow';
import axios from 'axios';
import { COLUMN_NAMES, PAGE_HEADER } from './src/constants';
import { BASE_URL } from './src/constants';
import LoadingTable from './src/LoadingTable';
import DisplayError from './src/DisplayError';

const BreweryTable: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = React.useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}?page=${page - 1}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setLoading(false);
          setData(response.data.data);
          setTotalCount(response.data.totalPages);
          setErrorMessage('');
          setError(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(true);
          setErrorMessage(err.message);
        }
      }
    };
    fetchData();
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const listOfBreweries = (data: BreweryInterface[]) => {
    return data.map((val) => <BreweryRow key={val.id} row={val} />);
  };

  return (
    <EntireContainer>
      {!error ? (
        <>
          <TextContainer>
            <Typography component='h1' variant='h5'>
              {PAGE_HEADER}
            </Typography>
          </TextContainer>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  {COLUMN_NAMES.map((val: string, i: number) => (
                    <TableCell key={`${val}-${i}`}>{val}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{loading ? LoadingTable() : listOfBreweries(data)}</TableBody>
            </Table>
            <Stack spacing={2}>
              <Pagination count={totalCount} page={page} onChange={handleChange} />
            </Stack>
          </TableContainer>
        </>
      ) : (
        <DisplayError err={errorMessage} />
      )}
    </EntireContainer>
  );
};

export default BreweryTable;

const EntireContainer = styled.div`
  margin-top: 25px;
  margin-right: 5%;
  margin-left: 5%;
`;

const TextContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  float: left;
`;
