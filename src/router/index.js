import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import EventService from '../services/EventService';

import GStore from '@/store';
import EventList from '../views/EventList';
import EventLayout from '../views/event/Layout';
import EventDetails from '../views/event/Details';
import EventRegister from '../views/event/Register';
import EventCreate from '../views/EventCreate';
import EventEdit from '../views/event/Edit';
import NotFound from '../views/NotFound';
import NetworkError from '../views/NetworkError';

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
    component: EventLayout, // <-- We removed the props: true.
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id) // Return and params.id
        .then((response) => {
          GStore.event = response.data; // <--- Store the event
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              // <--- Return
              name: '404Resource',
              params: { resource: 'event' },
            };
          } else {
            return { name: 'NetworkError' }; // <--- Return
          }
        });
    },
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
        meta: { requireAuth: true },
      },
    ],
  },
  // Redirect with Wildcard
  // This is taking whatever comes after the matching word /event/ and placing it after /events/. This covers all children routes
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events/' + to.params.afterEvent };
    },
  },
  {
    path: '/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/about-us',
    name: 'About',
    alias: '/about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from) => {
  NProgress.start();

  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page';

    setTimeout(() => {
      GStore.flashMessage = '';
    }, 3000);

    if (from.href) {
      // If this navigation came from a previous page.
      return false;
    } else {
      // Must be navigating directly
      return { path: '/' }; // <--- Push navigation to the root route.
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
