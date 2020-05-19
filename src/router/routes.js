export const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),

    children: [
      {
        path: 'movie-list',
        name: 'MovieList',
        component: () => import('../views/home_views/MovieList.vue')
      },
      {
        path: 'add-movie',
        name: 'AddMovie',
        component: () => import('../views/home_views/AddMovie.vue')
      },
      {
        path: 'movie-detail',
        name: 'MovieDetail',
        component: () => import('../views/home_views/MovieDetail.vue')
      },
      {
        path: 'my-info',
        name: 'MyInfo',
        component: () => import('../views/home_views/MyInfo.vue')
      },
      {
        path: 'add-info',
        name: 'AddInfo',
        component: () => import('../views/home_views/AddInfo.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/home_views/Settings.vue')
      },
      {
        path: 'about-me',
        name: 'AboutMe',
        component: () => import('../views/home_views/AboutMe.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
]
