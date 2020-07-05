import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store'
import { Routes } from '@/constants/router'
import Config from '@/views/Config'
import { Layout } from '@/constants/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/dashboard',
    component: Dashboard,
    meta: {
      breadcrumbs: ['Dashboard']
    }
  },
  {
    path: Routes.config.path,
    name: Routes.config.name,
    component: Config,
    meta: {
      breadcrumbs: ['Config']
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/Settings.vue'),
    meta: {
      breadcrumbs: ['Settings']
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      breadcrumbs: ['Login']
    }
  },
  {
    path: '/profiles',
    name: 'profiles',
    meta: {
      breadcrumbs: ['Profiles']
    },
    component: () => import(/* webpackChunkName: "profiles" */ '@/views/Profiles/Profiles.vue'),
    children: [
      {
        path: ':id',
        name: 'profile',
        meta: {
          breadcrumbs: ['Profiles', '...']
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile/Profile.vue')
      }
    ]
  },
  {
    path: '/profiles/create',
    name: 'create-profile',
    meta: {
      breadcrumbs: ['Profiles', 'Create']
    },
    component: () => import(/* webpackChunkName: "profile-create" */ '@/views/Profile/CreateProfile.vue')
  },
  {
    path: '/event-logs',
    name: 'event-logs',
    component: () => import(/* webpackChunkName: "event-logs" */ '@/views/EventLogs.vue'),
    meta: {
      breadcrumbs: ['Event Logs']
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // Toggle navbar extension depending on to.meta.navbarExtension
  const navbarExtension = (to.meta || {}).navbarExtension || false
  store.dispatch('layout/' + Layout.setNavbarExtension, navbarExtension)

  // Set breadcrumbs if to.meta.breadcrumbs exists
  const breadcrumbs = (to.meta || {}).breadcrumbs
  if (breadcrumbs) store.dispatch('layout/' + Layout.setBreadcrumbs, breadcrumbs)

  if (store.getters.untouched && to.name !== Routes.config.name) next({ name: Routes.config.name })
  else if (to.name === Routes.config.name && !store.getters.untouched) next({ name: 'home' })
  else next()
})

export default router
