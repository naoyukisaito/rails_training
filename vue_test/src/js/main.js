import Vue from 'vue';
import Router from 'vue-router';
// import { domain, fromNow } from './filters'
import App from '../vue/App.vue';
import Home from '../vue/pages/index.vue';
import Page1 from '../vue/pages/page1.vue';
import Page2 from '../vue/pages/page2.vue';
// import ItemView from './components/ItemView.vue'
// import UserView from './components/UserView.vue'

// install router
Vue.use(Router);

// register filters globally
// Vue.filter('fromNow', fromNow)
// Vue.filter('domain', domain)

// routing
const router = new Router();
//
router.map({
  '/': {
    component: Home
  },
  '/page1/:color': {
    component: Page1
  },
  '/page2': {
    component: Page2
  },
  // '/item/:id': {
  //   component: ItemView
  // }
});
  //
  // router.beforeEach(function () {
  //   window.scrollTo(0, 0)
  // })

// router.redirect({
//   '*': '/news/1'
// })

router.start(App, '#app');

// let test =>() {
//     console.log('ok');
// };
