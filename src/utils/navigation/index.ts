export interface INavigationRoutes {
  path: string;
  name: string;
  icon: string;
}

export const routes: INavigationRoutes[] = [
  {
    path: '/',
    name: 'Home',
    icon: 'home',
  },
  {
    path: '/jobs',
    name: 'Jobs',
    icon: 'work',
  },
  {
    path: '/candidates',
    name: 'Candidates',
    icon: 'people',
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'person',
  },
];
