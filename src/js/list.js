require(["config"],function () {
    require(["jquery","art_template","Header","Footer"],function ($,art_template){
        function List() {
            this.init();
        }
        $.extend(List.prototype,{
         init(){
            this.getData();
         },
         getData(){
             var _this = this;
           let type = location.search.slice(6);
             $.ajax({
                 type: "get",
                 url: "http://localhost/php/getdata.php",
                 data: "type="+type,
                 success: function(msg){
                   var msg = JSON.parse(msg);
                   var html = art_template("gooodlists",{list: msg.res_list.data});
                     $(".goods").html(html);
                     _this.come_into();
                 }
             })
         },
         //商品详情
            come_into(){
             $(".goods").on("click","li",function (e) {
                 if(e.currentTarget.nodeName =="LI"){
                     var description = e.currentTarget.getAttribute("data_id");
                     console.log(description)
                     location.href = "/html/detil.html?description="+description;

                 }
             })
            }

        })
        new List();
    })
})