<template>
<div class='main'>
 <header>
     <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
     <div class='head'>
      <el-submenu :index="index+''" v-for='(i,index) in arr'>
        <template slot="title">{{i.onedata.cnname}}</template>
        <el-menu-item index="2-1" v-for='item in i.twodata' @click='changeFn(item,i.onedata.cnname)'>{{item.cnname}}</el-menu-item>
      </el-submenu>
      </div>
    </el-menu>
    <nav>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{navtwo}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{navone}}</el-breadcrumb-item>
        </el-breadcrumb>
    </nav>
 </header>
  <section>
         <div class='sec_top'>
             <div class='img'>
                 <img src='../../static/images/art.jpg'>
             </div>
             <div class='mine'>
                <span>我的名片</span>
                 <ul>
                     <li>网名：婷婷</li>
                     <li>职业：Web前端工程师</li>
                     <li>电话：12345467</li>
                     <li>Email:16524497532qq.com</li>
                 </ul>
             </div>
         </div>
         <div class='sec_num'>
             <div class='num_left'>
                 <ul class='left_list'>
                     <li>
                       <span class="title">我希望我的爱情是这样的</span>
                         <div class="textinfo">
                         <p class='img1'><img src='../../static/images/s1.jpg'></p>
                         <p class='letter'>我希望我的爱情是这样的，相濡以沫，举案齐眉，平淡如水。我在岁月中找到他，依靠他，将一生交付给他。做他的妻子，他孩子的母亲，为他做饭，洗衣服，缝一颗掉了的纽扣。然后，我们一起在时光中变老。</p>
                       </div>
                     </li>
                 </ul>
                   <el-table
                     :data="tableData2"
                     style="width: 100%"
                     :row-class-name="tableRowClassName">
                     <el-table-column
                       prop="date"
                       label="名字"
                       width="180">
                       <template scope='scope'>
                        <span>{{scope.row.article_name}}</span>
                       </template>
                     </el-table-column>
                     <el-table-column
                       prop="name"
                       label="内容"
                       width="180">
                       <template scope='scope'>
                       <span>{{scope.row.editer}}</span>
                      </template>
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="时间">
                       <template scope='scope'>
                       <span>{{scope.row.time}}</span>
                      </template>
                     </el-table-column>
                   </el-table>
                   <div class='block'>
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="nowPage"
                      :page-sizes="[4, 6, 8, 10]"
                      :page-size="everyrows"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="this.oldData.length">
                    </el-pagination>
                   </div>
             </div>
             <div class='num_right'>
                 <div class="tuijian">
                     <span>技术人员列表</span>
                     <el-card class="box-card">
                       <div v-for="o in listData" class="text item">
                         {{o.editer}}
                         <span>{{o.time}}</span>
                       </div>
                     </el-card>
                 </div>
                 <div class="tuijian">
                     <span>美食列表</span>
                     <el-card class="box-card">
                        <div v-for="o in listData" class="text item">
                          {{o.cnname_one}}
                          <span>{{o.time}}</span>
                        </div>
                      </el-card>
                 </div>
                 <div class='search'>
                     <input type='text' placeholder='search'>
                 </div>
             </div>
         </div>
     </section>
</div>
</template>
<style>
    .el-menu--dark{
        background:#222222
    }
    .el-menu-item{
        color:#ffffff
    }
      .el-table .info-row {
        background: #c9e5f5;
      }
      .el-table .positive-row {
        background: #e2f0e4;
      }
      .el-breadcrumb{
         padding-left: 20px;
         padding-top:10px
      }
      .block{
        margin-top:15px
      }
       .text {
          font-size: 14px;
          color: #a6a6a6
        }
        .item {
          padding: 8px 0;
        }
        .item span{
            float:right;
            padding-right:12px
        }
        .box-card {
          width: 480px;
          border:none;
          box-shadow:0 0 0 0
        }
        .el-card__body{
            background:#222222
        }
</style>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        arr:'',
        input:'',
        navone:'',
        navtwo:'技术',
        tableData2:[],
        listData:[],
        everyrows:5,
        oldData:[],
        nowPage:1,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      changeFn(one,two){
        this.navone=one.cnname;
        this.navtwo=two;
      },
      changeList(){

      },
      tableRowClassName(row,index){
         if (index === 1) {
           return 'info-row';
         } else if (index === 3) {
           return 'positive-row';
         }
         return '';
       },
        handleSizeChange(val) {
           this.everyrows=val;
           this.tableData2=this.oldData.slice((this.nowPage-1)*this.everyrows,this.everyrows);
         },
         handleCurrentChange(val) {
           this.nowPage=val;
           this.tableData2=this.oldData.slice((val-1)*this.everyrows,this.everyrows*val)
         }
    },
    created(){
       this.axios.get('http://localhost:9999/api/front_article/getNav').then((data)=>{
            this.arr=data.data.data
       });
        this.axios.get('http://localhost:9999/api/front_article/getArticleAll').then((data)=>{
             this.oldData=data.data.data;
             this.listData=this.oldData.slice(0,this.everyrows);
             this.tableData2=this.oldData.slice(0,this.everyrows)
      });

    }
  }
</script>