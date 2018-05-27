import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SelectProgram from '@/components/SelectProgram'
import EditProgram from '@/components/EditProgram'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sp',
      name: 'SelectProgram',
      component: SelectProgram
    },
    {
      path: '/ep:id',
      name: 'EditProgram',
      component: EditProgram
    }
  ]
})
