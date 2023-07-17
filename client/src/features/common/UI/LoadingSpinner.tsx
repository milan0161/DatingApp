import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ScaleLoader';

const override: CSSProperties = {
  margin: '10% auto 0 auto',

  textAlign: 'center',
};
const LoadingSpinner = () => {
  return (
    <>
      <ClipLoader
        height={'70px'}
        cssOverride={override}
        color="#333333"
        aria-label="Loading Spinner"
      />
      <p className="text-center text-xl font-bold">Loading...</p>
    </>
  );
};

export default LoadingSpinner;
