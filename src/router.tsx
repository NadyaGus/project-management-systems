import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ROUTES } from './constants';
import { TasksPage } from './pages/TasksPage';
import { getAllTasks } from './services/tasks';
import { globalStore } from './store/GlobalStore';

const tasksLoader = async () => {
  const data = await getAllTasks();
  globalStore.setTasks(data?.data || []);
};

export const router = createBrowserRouter([
  {
    path: ROUTES.root.href,
    element: <Layout />,
    children: [
      {
        path: ROUTES.root.href,
        element: <Navigate to={ROUTES.issues.href} />,
      },
      {
        path: ROUTES.boards.href,
        element: <div>Boards</div>,
      },
      {
        path: ROUTES.board.href,
        element: <div>Board Details</div>,
      },
      {
        path: ROUTES.issues.href,
        loader: tasksLoader,
        element: <TasksPage />,
      },
    ],
  },
]);
