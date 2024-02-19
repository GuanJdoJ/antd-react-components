const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'HomeOutlined',
    component: '@/pages/dashboard',
  },
];

export default routes;
