import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import loading from './component/loading.vue';
import index from './component/index.vue';
var num=true;
Vue.use(Vuex);
const router=new Router({
    routes:[{
        name:'index',
        path:'/',
        component:index
    },{
        name:'loading',
        path:'/loading',
        component:loading
    }]
});

var store=new Vuex.Store({
    state:{
        navData:null,
        articleData:null,
        state:false
    },
    actions:{
        //
        getAllData({commit}){
            commit('state_m','loading');
            var dataActicle=new Promise((resolve,reject)=>{
                this.axios.get('http://localhost:9999/api/front_article/getArticle').then((data)=>{
                    resolve();
                    commit('navData_m',data)
                })
            });
            var dataNav=new Promise((resolve,reject)=>{
                this.axios.get('http://localhost:9999/api/front_article/getNav').then((data)=>{
                    resolve();
                    commit('articleData_m',data)
                })
            });
            return{
                axios:this.axios,
                dataNav,
                dataActicle
            }
        },
        //最初执行
        defaultData({dispatch,commit},fn){
            commit('state_m','start');
            dispatch('getAllData').then((data)=>{
                Promise.all([data.dataNav,data.dataActicle]).then(()=>{
                    commit('state_m','end');
                    if(num){
                        commit('state_m',false);
                        num=false
                    }
                    //fn()
                },()=>{
                    commit('state_m',false);
                })
            })
        }
    },
    mutations:{
        navData_m(state,data){
            state.navData=data
        },
        articleData_m(state,data){
            state.navData=data
        },
        state_m(state,data){

            state.state=data
        }
    }
});

Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.use(Router);

var vm = new Vue({
    el: "#app",
    router,
    store,
    data(){
      return{
         navData:null
      }
    },
    created(){
        this.$store.axios=this.axios;
        if(!this.navData){
            this.$router.push({path:'/loading'})
        }

    }
});