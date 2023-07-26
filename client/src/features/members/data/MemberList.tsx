import { useState } from 'react';
import LoadingSpinner from '../../common/UI/LoadingSpinner';
import { useGetMembersQuery } from '../api/membersApi';
import MemberCard from './MemberCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FilterForm from './FilterForm';

const MemberList = () => {
  const [orderBy, setOrderBy] = useState<string>('lastActive');
  const [pagAndFilter, setPagAndFilter] = useState<PaginationRequest>({
    itemsPerPage: 5,
    maxAge: 99,
    minAge: 18,
    page: 1,
    gender: '',
  });
  const {
    data: members,
    isSuccess,
    isLoading,
  } = useGetMembersQuery({ ...pagAndFilter, orderBy: orderBy });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagAndFilter((curent) => {
      return { ...curent, page: value };
    });
  };

  const orderByLastActiveHandler = () => {
    setOrderBy('lastActive');
  };
  const orderByCreated = () => {
    setOrderBy('created');
  };
  return (
    <div>
      <div className="text-center my-5">
        <h2 className="text-[32px]">
          Your Matches - {members?.totalItems} found
        </h2>
      </div>
      <div className="container mb-5 flex">
        <FilterForm
          filter={pagAndFilter}
          setFilters={setPagAndFilter}
          gender={members?.data[0].gender}
        />
        <div className="flex items-center">
          <button
            onClick={orderByLastActiveHandler}
            className="px-2 py-1 bg-red-700 text-white rounded-bl rounded-tl"
          >
            Last Active
          </button>
          <button
            onClick={orderByCreated}
            className="px-2 py-1 bg-red-500 text-white rounded-tr rounded-br"
          >
            Newest members
          </button>
        </div>
      </div>
      <div className=" mx-auto mt-4 gap-6 members_list">
        {isSuccess &&
          members.data &&
          members.data.map((member) => {
            return <MemberCard key={member.id} member={member} />;
          })}
      </div>
      <div className="flex flex-row justify-center mt-5">
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
            count={members?.totalPages}
            variant="outlined"
            shape="rounded"
            // color="primary"
            page={pagAndFilter.page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default MemberList;
