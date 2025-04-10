export const ROUTES = {
  root: { href: '/', name: 'Главная' },
  boards: { href: '/boards', name: 'Проекты' },
  board: { href: '/boards/:id', name: 'Проект' },
  issues: { href: '/issues', name: 'Все задачи' },
} as const;
