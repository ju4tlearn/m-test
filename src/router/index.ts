import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/IndexView.vue'),
      children: [
        {
          path: '/',
          name: 'workspace',
          component: () => import('@/views/WorkspaceView.vue')
        },
        {
          path: '/repos',
          name: 'repos',
          component: () => import('@/views/ReposView.vue'),
          children: [
            {
              path: '/repos/create',
              component: () => import('@/views/Repos/CreateRepoView.vue')
            },
            {
              path: '/repos',
              component: () => import('@/views/Repos/ReposViewIndex.vue'),
              children: [
                {
                  path: '/repos',
                  component: () => import('@/views/Repos/OverviewView.vue')
                },
                {
                  path: '/repos/recent',
                  component: () => import('@/views/Repos/RecentView.vue')
                },
                {
                  path: '/repos/openSource',
                  component: () => import('@/views/Repos/OpenSourceView.vue')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/:pathMatched(.*)*',
      name: 'Not Found',
      props: (route: { params: { pathMatched: string } }) => ({
        pathMatched: `/${route.params.pathMatched}`
      }),
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('isLogin') === '1'
  if (to.name !== 'login' && !isLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
