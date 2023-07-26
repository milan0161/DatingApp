import { useState } from 'react';
import LoadingSpinner from '../../common/UI/LoadingSpinner';
import { useGetLikesQuery } from '../api/likesApi';
import MemberCard from '../../members/data/MemberCard';
import PaginationComponent from '../../common/UI/PaginationComponent';

const LikesList = () => {
  const [predicate, setPredicate] = useState<string>('liked');
  const [pagination, setPagination] = useState<PaginationRequest>({
    itemsPerPage: 6,
    page: 1,
  });
  const { data, isLoading } = useGetLikesQuery({
    ...pagination,
    predicate: predicate,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination((curent) => {
      return { ...curent, page: value };
    });
  };

  return (
    <>
      <h1 className="text-center mt-5">
        {predicate === 'liked' ? 'Members I like' : 'Members who like me'}
      </h1>
      <div className="container mt-5">
        <div className="">
          <button
            onClick={() => {
              setPredicate('liked');
            }}
            className={`px-2 py-1  text-white rounded-bl rounded-tl ${
              predicate === 'liked' ? 'bg-red-700' : 'bg-red-500'
            }`}
          >
            Members I Like
          </button>
          <button
            onClick={() => {
              setPredicate('likedBy');
            }}
            className={`px-2 py-1 bg-red-500 text-white rounded-tr rounded-br ${
              predicate === 'likedBy' ? 'bg-red-700' : 'bg-red-500'
            }`}
          >
            Members who like me
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-10">
          {data?.data.map((member) => {
            return <MemberCard key={member.id} member={member} />;
          })}
        </div>
        <div className="flex flex-row justify-center mt-5">
          <PaginationComponent
            count={data?.totalPages}
            page={pagination.page}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default LikesList;
