// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.directive('css', {
    inserted(el, bind){
        let styleObj = bind.value;
        let arr = [];
        for(var key in styleObj){
            arr.push(key + ":" + styleObj[key]);
        }
        arr = arr.join(';');
        el.style.cssText = arr;
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
