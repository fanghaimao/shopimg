define(["jquery"],function ($) {
     class Header{
         constructor(){
             this.init().then(()=>{
                 this.show();
                 this.getSe();
                 this.sign_in();
                 this.num();
                 this.mouse();
                 this.search();
                 this.event();
                 this.getDom();
                 this.showhide();
                 this.hasSessionStorage();
             });
         }
         init() {
             return new Promise((resolve, reject) => {
                 $(".header").load("/html/modul/Header.html", () => {
                     resolve();
                 })
             })
         }
         getDom(){
             this.logoIn = $(".logoIn");
         }
         //显示登录的显示隐藏
         showhide(){
             this.logoIn.toggle();
         }
         //如果是注册过来的，让登录显示
         hasSessionStorage(){
             this.SessionStorage = sessionStorage.getItem("logo_in");
             // console.log(this.cookie);
             if(this.SessionStorage){
                 this.showhide();
             }
         }
         //页面中的一些事件
         event(){
             $(".logo").on("click",function () {
                 location.href = "/index.html";
             })
             //导航栏进去列表页
             $(".data_x").on("click",function () {
                 location.href = "/html/list.html?type=1&class=1";
             })
             $(".data_y").on("click",function () {
                 location.href = "/html/list.html?type=2&class=1";
             })
             $(".data_z").on("click",function () {
                 location.href = "/html/list.html?type=5&class=1";
             })
             $(".data_a").on("click",function () {
                 location.href = "/html/list.html?type=6&class=1";
             })
             $(".data_b").on("click",function () {
                 location.href = "/html/lpl.html";
             })
         }
         show(){
             $(".lo_in").on("click",function (e) {
                 $(".logoIn").toggle();
                 console.log($(".logoIn"));
             })
         }
         getSe(){
             if(sessionStorage.getItem("ok_logo_in")){
                var  storage = JSON.parse(sessionStorage.getItem("ok_logo_in"));
                 $(".yourname").html(storage.username);
                 $(".show").css({display:'none'});
                 $(".hide").css({display: "block"});
             }else {
                 $(".show").show();
                 $(".hide").hide();
             }
         }
         sign_in(){
             $(".data_sign_out").on("click",()=>{
                 sessionStorage.clear();
                 this.getSe()
             })
         }
         num(){
             var number = localStorage.getItem("num");
             if(number == undefined){
                 number =0;
             }
             $(".num").html(number);
         }
         //鼠标移进，移出下面类容的显示的方法
       mouse(){
           //header里面的下拉
           $("ul").on("mouseleave",function () {
               $(".order").hide();
               $(".server").hide();
               $(".er").hide();
           })
           $(".yourname").on("mouseenter",function () {
               $(".order").show();
           })

           $(".my_infor").on("mouseleave",function () {
               $(".order").hide();
           })
           $(".zixun").on("mouseenter",function () {
               $(".server").show();
           })

           $(".server").on("mouseleave",function () {
               $(".server").hide();
           })
           $(".wx").on("mouseenter",function () {
               $(".er").show();
           })
           $(".er").on("mouseleave",function () {
               $(".er").hide();
           })
       }
       //收搜框
       search(){
             var _this = this;
             $(".search_name").on("blur",function () {
                 _this.values = $(".search_name").val();
               var res = /\d+/;
               var res1 = /[猫狗狮螳螂卡兹克赵信李青野Yy]/;
               var res2 = /[中亚索劫zZ]/;
               var res3 = /[金克斯薇恩镜Cc]/;
               if( res.test(_this.values) || res1.test(_this.values)){
                   _this.values = "欢迎来到野区 - 今晚一起狩猎T恤";
               }
               if(res2.test(_this.values)){
                   _this.values = "K/DA 阿卡丽黑色棒球帽";
               }
               if(res3.test(_this.values)){
                   _this.values = "洛与霞口袋T恤";
               }
               console.log(_this.values)
                 if(_this.values != ""){
                     $.ajax({
                         type: "get",
                         url: "http://localhost/php/search.php",
                         data: "discription=" + _this.values,
                         success: (msg) => {
                             console.log(msg);
                             msg = JSON.parse(msg);
                             if(msg.res_code ==1){
                                 if(_this.values == "欢迎来到野区 - 今晚一起狩猎T恤"){
                                     location.href = "/html/list.html?type=1";
                                 }
                                 if(_this.values == "洛与霞口袋T恤"){
                                     location.href = "/html/list.html?type=2";
                                 }
                                 if(_this.values == "K/DA 阿卡丽黑色棒球帽"){
                                     location.href = "/html/list.html?type=3";
                                 }
                             }else {
                                 alert("暂无数据");
                             }
                         }
                     })
                 }
           })
       }




       /*/{
       // 1:b,
       //2:c
       // }
       mouse(obj,cot){
           obj.one("mouseenter",function () {
               var str = "";
               var ol = document.createElement("ol");
               ol.left = "0px";
               ol.top = "0px";
               for(let key in cot){
                 str = str + `<li>${cot[key]}</li>`;
               }
               ol.innerHTML = str;
               ol.setAttribute("style","width:99px;height:32px;color:#a1a1a1;line-height:32px;position:absolute");
               obj.append(ol);
               obj[0].style.position = "relative";
           })
       }*/
     }
     return new Header();
})