import styled from '@emotion/styled';
import ViewWeekRoundedIcon from '@mui/icons-material/ViewWeekRounded';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BreweryInterface } from '../../../../utils/types';
import BreweryRow from './BreweryRow';
import axios from 'axios';
import { COLUMN_NAMES, PAGE_HEADER, COLUMNS_HEADER } from './constants';
import { BASE_URL } from './constants';
import LoadingTable from '../LoadingTable';

const BreweryTable: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [totalCount, setTotalCount] = useState(0);
  const open = Boolean(anchorEl);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}?page=${page - 1}`;
        const response = await axios.get(url);
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          setData(response.data.data);
          setTotalCount(response.data.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const listOfBreweries = (data: BreweryInterface[]) => {
    return data.map((val) => <BreweryRow key={val.id} row={val} />);
  };

  return (
    <EntireContainer>
      <TextContainer>
        <Typography component='h1' variant='h5'>
          {PAGE_HEADER}
        </Typography>
      </TextContainer>
      <TableContainer component={Paper}>
        <FilterButtonNewUserContainer>
          <Container>
            <IconButton onClick={handleClick}>
              <ViewWeekRoundedIcon />
            </IconButton>
            <Typography component='span' variant='caption'>
              {COLUMNS_HEADER}
            </Typography>
          </Container>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
              {/* put switch here for columns */}
            </FormControl>
          </Menu>
        </FilterButtonNewUserContainer>
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
    </EntireContainer>
  );
};

export default BreweryTable;

const EntireContainer = styled.div`
  margin-top: 25px;
`;

const Container = styled.div`
  display: flex;
  display: inline;
  align-items: center;
`;

const FilterButtonNewUserContainer = styled.div`
  padding: 20px;
`;

const TextContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  float: left;
`;
