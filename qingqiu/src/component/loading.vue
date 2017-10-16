<template>
    <div>
    <p v-if="state=='start'">
        数据开始请求
    </p>
    <p v-else-if="state=='loading'">
            数据正在加载
     </p>
     <p v-else-if="state=='end'">
          数据请求成功
    </p>
     <p v-else>
          数据请求失败，重新请求
     </p>
    </div>
</template>
<script>
    import {mapActions,mapState} from 'vuex'
    export default{
        name:'index',
        created(){
            //路由跳转接收
           //this.defaultData(this.redirectFn)
           this.defaultData()
        },
        computed:{
            ...mapState({
                state:function(state){
                    if(state.state=='end'){
                        this.$router.push({path:'/'})
                    }else if(!state.state){
                         this.defaultData()
                    }
                    return state.state
                }
            })
        },
        methods:{
        //路由跳转函数
        /*redirectFn(){
            this.$router.push({path:'/'})
        },*/
            ...mapActions(["defaultData"])
        }
    }
</script>