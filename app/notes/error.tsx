'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <>
      <p>The list of notes could not be fetched. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </>
  );
};
export default Error;