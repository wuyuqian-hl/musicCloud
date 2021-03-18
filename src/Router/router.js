import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err) 
}

let router = new VueRouter({
  mode:'history',
  routes: [{
    path: '/home',
    name:'home',
    component:()=>import ('@/components/Home')
  },{
    path: '/Recommend',
    name:'Recommend',
    component:()=>import ('@/components/Recommend')
  },{
    path: '/HotMusic',
    name:'HotMusic',
    component:()=>import ('@/components/HotMusic')
    },
    {
      path: '*',
      component:()=>import ('@/components/Home')
    },{
    path: '/SearchMusic',
    name:'SearchMusic',
    component:()=>import ('@/components/SearchMusic')
  },{
    path: '/musicDetails',
    name:'musicDetails',
    component:()=>import ('@/components/musicDetails')
  },
  ]
})

export default router