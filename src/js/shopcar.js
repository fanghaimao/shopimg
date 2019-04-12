require(["config"],function () {
    require(["jquery","art_template","Header","Logo_in","Footer"],function ($,art_template,header){
          class Shopcar{
              constructor(){
                  this.init();
              }
              init(){
                  this.getlocal();
                  this.events();
                  this.allcheck();
                  this.clac();
              }
              //页面中的事件
              events(){
                  var num = "";
                  //数量的加减
                  $(".tbody").unbind('click').on("click",(e)=>{
                      if(e.toElement.className == "reduce"){
                          var id = e.toElement.parentElement.parentElement.getAttribute("data_id");
                          num =  e.toElement.nextElementSibling.value;
                          console.log(num);
                          num--;
                          if(num<=1){
                              num = 1;
                          }
                          e.toElement.nextElementSibling.value = num;
                          this.local[this.getObjIndexInArr(this.local,id).index].number = num;
                          localStorage.setItem("goods",JSON.stringify(this.local));
                          this.clac();
                          header.num();
                      }
                      if(e.toElement.className == "add"){
                          var id = e.toElement.parentElement.parentElement.getAttribute("data_id");
                          num =  e.toElement.previousElementSibling.value;
                          console.log(num)
                          num++;
                          e.toElement.previousElementSibling.value = num;
                          this.local[this.getObjIndexInArr(this.local,id).index].number = num;
                          localStorage.setItem("goods",JSON.stringify(this.local));
                          this.clac();
                          header.num();
                      }
                      if(e.toElement.className == "del"){
                          var id = e.toElement.parentElement.parentElement.getAttribute("data_id");
                          e.toElement.parentElement.parentElement.remove();
                          this.local.splice([this.getObjIndexInArr(this.local,id).index],1);
                          localStorage.setItem("goods",JSON.stringify(this.local));
                          this.clac();
                          header.num();
                      }
                  })
                   //input框失去焦点
                  $(".keyup").on("blur",(e)=>{
                      var id = e.currentTarget.parentElement.parentElement.getAttribute("data_id");
                      num = e.currentTarget.value;
                      this.local[this.getObjIndexInArr(this.local,id).index].number = num;
                      localStorage.setItem("goods",JSON.stringify(this.local));
                      this.clac();
                      header.num();
                  })
                  //继续购物
                  $(".continue_shoping").unbind("click").one("click",function () {
                      window.history.go(-2);
                  })
                  //事件委托
                  $(".contain").on("change","input",(e)=>{
                      //全选按钮
                      if(e.currentTarget.className =="check_all"){
                          var ainput = document.querySelectorAll(".tbody input[type='checkbox']");
                          var check_all = document.querySelector(".check_all");
                          if( check_all.checked){
                              for(let i =0 ; i < ainput.length ; i++){
                                  ainput[i].checked = true;
                              }
                          }else {
                              for(let i =0 ; i < ainput.length ; i++){
                                  ainput[i].checked = false;
                              }
                          }
                      }
                      this.clac();
                  })
                  //清空购物车
                  $(".clear_goods").on('click',()=>{
                      if(confirm("确定要清空购物车吗")){
                          localStorage.clear("goods");
                          header.num();
                          this.getlocal();
                      }
                  })
              }
              allcheck(){
                  var ainput = document.querySelectorAll(".tbody input[type='checkbox']");
                  var check_all = document.querySelector(".check_all");
                  if( check_all.checked){
                      for(let i =0 ; i < ainput.length ; i++){
                          ainput[i].checked = true;
                      }
                  }else {
                      for(let i =0 ; i < ainput.length ; i++){
                          ainput[i].checked = false;
                      }
                  }
              }
              //操作Dom
              operationDom(){
                $(".goods_number").html(this.goods_number_all);
                $(".goods_all_price").html(this.sun_all);
                if(this.sun_all > 199){
                    $(".yc").hide();
                    $(".xs").show();
                }else {
                    $(".yc").show();
                    $(".xs").hide();
                }
                $(".data_in_index").on("click",function () {
                    location.href = "../index.html";
                })
              }
              //判断一个数组里面的对象里面的id和现有的id相等不相等，并返回，如果有返回对应对象在数组里面的下标
              getObjIndexInArr(arr,id){
                  var index =0;
                  if(arr.some(function (item ,index1) {
                      index = index1;
                      return item.id == id;
                  })){
                      //数组里有
                      return {"index" : index,"obj":arr[index]};
                  }else {
                      //数组里没有
                      return {index : -1};
                  }
              }
              //得到本地存储数据
              getlocal(){
                  if( localStorage.getItem("goods")){
                      this.local = JSON.parse(localStorage.getItem("goods"));
                      //隐藏showhide
                      $(".showhide").hide();
                      $(".contain").show();
                      //调用渲染
                      this.rend();
                  }else {
                      $(".showhide").show();
                      $(".contain").hide();
                  }

              }
              //渲染方法
              rend(){
                  var vhtml = art_template("carlist",{list:this.local});
                  $(".tbody").html(vhtml);
                  this.events();
              }
              //价格计算
              clac(){
              var check_num =  $(".tbody input:checked");
              this.sun_all = 0;
              this.goods_number_all = 0;
              for(let i = 0 ;i < check_num.length ; i++){
                  let num = check_num[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[1].value;
                  let price = check_num[i].parentElement.nextElementSibling.nextElementSibling.children[0].innerHTML.slice(1);
                  let small_all = check_num[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
                       small_all.innerHTML = num *price;
                  this.sun_all = this.sun_all + num * price ;
                  this.goods_number_all = this.goods_number_all + Number(num);
                }
              this.operationDom();
             /* if(localStorage.getItem("num") != this.goods_number_all){
                      location.reload();
                  }*/
              localStorage.setItem("num",this.goods_number_all);
              }
          }
          new Shopcar()
    })
})