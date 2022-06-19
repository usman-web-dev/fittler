import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  head: {
    titleTemplate: '%s - Fittler',
    title: 'Fittler',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700&display=swap'
      }
    ]
  },

  css: ['@/assets/scss/index.scss'],

  plugins: [
    '~/plugins/vee-validate',
    '~/plugins/helpers',
    '~/plugins/alert',
    '~/plugins/api',
    { src: '~/plugins/chart.js', mode: 'client' }
  ],

  srcDir: 'src',

  loading: '@/components/shared/loading/index.vue',

  components: [
    { path: '@/components/', extensions: ['vue'] },
    { path: '@/components/shared/', extensions: ['vue'] }
  ],

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/firebase', '@nuxtjs/axios'],

  router: {
    prefetchLinks: false,
    extendRoutes(routes, resolve) {
      routes.push(
        ...[
          {
            name: 'diet-plans-id-edit',
            path: '/diet-plans/:id/edit',
            component: resolve(__dirname, 'src/pages/diet-plans/add/index.vue')
          },
          {
            name: 'diet-plans-id-view',
            path: '/diet-plans/:id/view',
            component: resolve(__dirname, 'src/pages/diet-plans/add/index.vue')
          },
          {
            name: 'users-id-edit',
            path: '/users/:id/edit',
            component: resolve(__dirname, 'src/pages/users/add/index.vue')
          }
        ]
      );
    }
  },

  render: {
    resourceHints: false
  },

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY!,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.FIREBASE_PROJECT_ID!,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.FIREBASE_APP_ID!,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID!
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedMutation: 'SET_LOGGED_IN',
          onAuthStateChangedAction: 'setLoggedIn'
        }
      },
      firestore: true,
      storage: true
    }
  },

  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/scss/vuetify-variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#6c63ff',
          accent: '#f8f8ff',
          secondary: '#7d7d7d',
          warning: '#ffa21a',
          error: '#f55a4e',
          success: '#5cb860'
        }
      }
    },
    defaultAssets: {
      font: false as unknown as undefined,
      icons: 'mdi'
    }
  },

  serverMiddleware: [{ path: '/firebase', handler: '~/server-middleware/firebase.ts' }],

  build: {
    transpile: ['vee-validate/dist/rules']
  }
};

export default config;
