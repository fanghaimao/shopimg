require(["config"],function () {
    require(["jquery","art_template","Header","Footer"],function ($,art_template){
          class Shopcar{
              constructor(){
                  this.init();
              }
              init(){
                  this.getlocal();
              }
              //页面中的事件
              events(){
                  var num = "";
                  //数量的加减
                  $(".reduce").on("click",(e)=>{
                          num =  e.toElement.nextElementSibling.value;
                          num--;
                          if(num<=1){
                              num = 1;
                          }
                      e.toElement.nextElementSibling.value = num;
                       localStorage.setItem("goods")
                  })
                  $(".add").on("click",(e)=>{
                      num =  e.toElement.previousElementSibling.value;
                      num++;
                      e.toElement.previousElementSibling.value = num;
                  })
                  $(".keyup").on("blur",(e)=>{
                      console.log(e.currentTarget)
                      num = e.currentTarget.currentTarget;

                  })
              }
              //得到本地存储数据
              getlocal(){
                  if( localStorage.getItem("goods")){
                      this.local = JSON.parse(localStorage.getItem("goods"));
                      console.log(this.local)
                      //调用渲染
                      this.rend();
                  }

              }
              //渲染方法
              rend(){
                  var vhtml = art_template("carlist",{list:this.local});
                  $(".tbody").html(vhtml);
                  this.events();
              }
          }
          new Shopcar()
    })
})