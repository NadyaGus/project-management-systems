import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Navigate,
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { ROUTES } from './constants';
import { TasksPage } from './pages/TasksPage';
import { getAllTasks } from './services/tasks';
import { globalStore } from './store/GlobalStore';
import { BoardsPage } from './pages/BoardsPage';
import { getAllBoards, getBoardTasks } from './services/boards';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { boardStore } from './store/BoardStore';

const tasksLoader = async () => {
  if (!globalStore.tasks.length) {
    const data = await getAllTasks();
    globalStore.setTasks(data?.data || []);
  }
};

const boardsLoader = async () => {
  if (!globalStore.boards.length) {
    const data = await getAllBoards();
    globalStore.setBoards(data?.data || []);
  }
};

const boardByIdLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.boardId;
  const tasks = await getBoardTasks(Number(id));

  boardStore.setBoardTasks(tasks?.data || []);
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
        loader: boardsLoader,
        element: <BoardsPage />,
      },
      {
        path: ROUTES.board.href,
        loader: boardByIdLoader,
        element: <BoardPage />,
      },
      {
        path: ROUTES.issues.href,
        loader: tasksLoader,
        element: <TasksPage />,
      },
    ],
  },
]);
