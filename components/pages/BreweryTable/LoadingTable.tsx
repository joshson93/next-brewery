import { Skeleton, TableCell, TableRow } from '@mui/material';

const LoadingTable = () => {
  return [...Array(7)].map((row, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton animation='wave' variant='text' />
      </TableCell>
      <TableCell>
        <Skeleton animation='wave' variant='text' />
      </TableCell>
      <TableCell>
        <Skeleton animation='wave' variant='text' />
      </TableCell>
      <TableCell>
        <Skeleton animation='wave' variant='text' />
      </TableCell>
    </TableRow>
  ));
};

export default LoadingTable;
