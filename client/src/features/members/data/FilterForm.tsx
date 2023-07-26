import { useForm } from 'react-hook-form';

type FilterFormProps = {
  setFilters: React.Dispatch<React.SetStateAction<PaginationUserRequest>>;
  filter: PaginationUserRequest;
  gender?: string;
};
type FilterInputs = {
  gender: string;
  minAge: number;
  maxAge: number;
};

const FilterForm = ({ filter, setFilters, gender }: FilterFormProps) => {
  const { register, handleSubmit, reset } = useForm<FilterInputs>({
    defaultValues: { gender, maxAge: filter.maxAge, minAge: filter.minAge },
  });

  const onAppliedFilltersHandler = (data: FilterInputs) => {
    setFilters((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };
  const resetFiltersHandler = () => {
    setFilters({
      itemsPerPage: 5,
      maxAge: 99,
      minAge: 18,
      page: 1,
      gender: '',
    });
    reset();
  };
  return (
    <form
      className="flex gap-x-5"
      onSubmit={handleSubmit(onAppliedFilltersHandler)}
      noValidate
    >
      <div className="flex items-center gap-x-5 w-1/5 px-2">
        <label htmlFor="ageFrom">Age from: </label>
        <input
          className="border border-slate-300 px-2 py-1 rounded w-1/2"
          {...register('minAge')}
          type="number"
          id="ageFrom"
        />
      </div>
      <div className="flex items-center gap-x-5 w-1/5 px-2">
        <label htmlFor="ageTo">Age to: </label>
        <input
          className="border border-slate-300 px-2 py-1 rounded w-1/2"
          {...register('maxAge')}
          type="number"
          id="ageTo"
        />
      </div>
      <div className="flex items-center gap-x-5">
        <label htmlFor="gender">Show: </label>
        <select
          className="border border-slate-300 px-4 py-1 rounded"
          {...register('gender')}
          id="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <button
          className="border border-white px-2 py-1 bg-orange-600 text-white hover:bg-white hover:text-orange-600 hover:border-orange-600 rounded duration-200"
          type="submit"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFiltersHandler}
          className="border border-white px-2 py-1 bg-cyan-600 text-white hover:bg-white hover:text-cyan-600 hover:border-cyan-600 rounded duration-200"
          type="button"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
