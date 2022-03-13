import { Button } from '@mui/material';

const SSRPage = () => {
  return (
    <>
      <Button variant="contained" color="primary">
        Sup ssr bro
      </Button>
      <StyledButton />
    </>
  );
};

export const getServerSideProps = () => {
  return { props: {} };
};

export default SSRPage;
