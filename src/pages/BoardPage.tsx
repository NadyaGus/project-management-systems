import { Link, useLoaderData } from 'react-router-dom';
import { Board } from '../types/board';
import { Button } from '@mui/material';
import { ROUTES } from '../constants';

export const BoardPage = () => {
  const loaderData = useLoaderData<{ data: Board }>();

  return (
    <>
      <Link to={ROUTES.boards.href}>
        <Button>К Доскам </Button>
      </Link>

      <div>BoardPage {JSON.stringify(loaderData)}</div>
    </>
  );
};
