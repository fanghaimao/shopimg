require(["config"],function () {
    require(["jquery","art_template","Header","Footer"],function ($,art_template){
        class  Lol{
            constructor(){
                this.init();
                this.data1 = [];
            }
            init(){
               this.getData();
            }
            getData(){
              var _this = this;
                $.ajax({
                    type: "get",
                    url: "http://localhost/php/lol.php",
                    data: "",
                    success: function(msg){
                        console.log(JSON.parse(msg))
                     var res = JSON.parse(msg);
                       for(let i = 0;i<res.res_list.data.length;i++){
                           if(res.res_list.data[i].type == 1){
                                _this.data1.push(res.res_list.data[i]);
                           }
                       }
                       var html = art_template("data_list1",{list:_this.data1});
                    }
                });
            }
        }
        new  Lol();
    })
})