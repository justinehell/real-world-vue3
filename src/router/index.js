import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventLayout from '../views/event/Layout';
import EventDetails from '../views/event/Details';
import EventRegister from '../views/event/Register';
import EventEdit from '../views/event/Edit';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    props: true,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ],
  },
  // // Redirect with children
  // {
  //   path: '/event/:id',
  //   redirect: () => {
  //     return { name: 'EventDetails' };
  //   },
  //   children: [
  //     { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
  //     { path: 'edit', redirect: () => ({ name: 'EventEdit' }) },
  //   ],
  // },

  // // Redirect with Wildcard
  // This is taking whatever comes after the matching word /event/ and placing it after /events/. This covers all children routes
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events/' + to.params.afterEvent };
    },
  },
  {
    path: '/about-us',
    name: 'About',
    // Using Alias
    alias: '/about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
