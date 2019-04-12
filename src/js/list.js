require(["config"],function () {
    require(["jquery","Logo_in","art_template","Header","Footer"],function ($,Logo_in,art_template){
        function List() {
            this.init();
        }
        $.extend(List.prototype,{
         init(){
            this.getData();
            },
         getData(){
             var _this = this;
             this.type = location.search.slice(1);
             console.log(this.type)
             $.ajax({
                 type: "get",
                 url: "http://localhost/php/getdata.php",
                 data: this.type,
                 success: function(msg){
                   var msg = JSON.parse(msg);
                   console.log(msg)
                   var html = art_template("gooodlists",{list: msg.res_list.data});
                     $(".goods").html(html);
                     _this.come_into();
                     _this.event();
                 }
             })
         },
          //事件
          event(){
             console.log($(".liw"))
             $(".liw").on("mouseenter",function (e) {
                 $(this).find(".img1").hide();
                 $(this).find(".img2").show();
             })
              $(".liw").on("mouseleave",function (e) {
                  $(this).find(".img1").show();
                  $(this).find(".img2").hide();
              })
          },
         //商品详情
            come_into(){
             $(".goods").on("click","li",function (e) {
                 if(e.currentTarget.nodeName =="LI"){
                     var description = e.currentTarget.getAttribute("data_id");
                     var lclass = e.currentTarget.getAttribute("data_c")
                     console.log(description)
                     if(lclass){
                         location.href = "/html/detil.html?description="+description+"&class="+lclass;
                     }else {
                         location.href = "/html/detil.html?description="+description;
                     }
                 }
             })
            }
        })
        new List();
    })
})