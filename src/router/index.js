import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

import store from '@/store';
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
  },
  {
    path: '/events/:id',
    component: EventLayout,
    props: true,
    beforeEnter: async (to, from, next) => {
      try {
        await store.dispatch('fetchEventById', to.params.id);
        next();
      } catch (error) {
        if (error.response && error.response.status == 404) {
          next({
            name: '404Resource',
            params: { resource: 'event' },
          });
        } else {
          next({ name: 'NetworkError' });
        }
      }
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
        props: true,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
        props: true,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true },
        props: true,
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
    const message = 'Sorry, you are not authorized to view this page';
    store.dispatch('updateMessage', message);

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
