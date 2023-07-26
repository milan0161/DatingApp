import { Pagination, Stack } from '@mui/material';

type PaginationPops = {
  count: number | undefined;
  page: number;
  onChange: any;
};

const PaginationComponent = ({ count, onChange, page }: PaginationPops) => {
  return (
    <Stack spacing={2} color={'orange'}>
      <Pagination
        sx={{
          '& button': {
            backgroundColor: 'white',
            color: '#ea580c',
            fontWeight: 'bold',
          },
          // '& button:focus': {
          //   backgroundColor: '#ea580c',
          //   color: 'white',
          //   fontWeight: 'bold',
          // },
          '& button.Mui-selected': {
            backgroundColor: '#ea580c',
            color: 'white',
            fontWeight: 'bold',
          },
        }}
        count={count}
        variant="outlined"
        shape="rounded"
        // color="primary"
        page={page}
        onChange={onChange}
      />
    </Stack>
  );
};

export default PaginationComponent;
