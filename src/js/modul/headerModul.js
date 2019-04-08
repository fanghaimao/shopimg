define(["jquery"],function ($) {
     class Header{
         constructor(){
             this.init().then(()=>{
                 this.show();
                 this.getSe();
                 this.sign_in();
                 this.num();
             });
         }
         init() {
             return new Promise((resolve, reject) => {
                 $(".header").load("/html/modul/Header.html", () => {
                     resolve();
                 })
             })
         }
         show(){
             $(".lo_in").on("click",function (e) {
                 $(".logoIn").toggle();
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
         //
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
         /*//鼠标移进，移出下面类容的显示的方法
         //{
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