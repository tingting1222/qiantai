import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import shouye from './component/shouye.vue';

Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.use(Router);

var vm = new Vue({
    el: "#app",
    template:'<div><first></first></div>',
    components:{
        first:shouye
    }
});