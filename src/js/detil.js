require(["config"],function () {
    require(["jquery","Header","art_template"],function ($,header,art_template){
        class Detil{
            constructor(){
                this.number = 1;
                this.init();
            }
            init(){
              this.getData();
            }
            getData(){
                var discription = location.search.slice(13);
                $.ajax({
                    type: "get",
                    url: "http://localhost/php/xiangqing.php",
                    data: "discription="+discription,
                    success: (msg)=>{
                        var msg = JSON.parse(msg);
                        this.id = msg.res_list.data[0].id;
                        this.title = msg.res_list.data[0].title;
                        this.image = msg.res_list.data[0].img1;
                        this.price = msg.res_list.data[0].price;
                        var imgs = msg.res_list.data[0].bg;
                        imgs = imgs.split(",");
                        msg.res_list.data[0].bg = imgs;
                        console.log(msg);
                       var html =  art_template("box",{...msg.res_list.data[0]});
                        $(".contain").html(html);
                        this.buynum();
                        this.addCar();
                    }
                })
            }
            //购买数量的加减
            buynum(){

                $(".dis").on("click",()=>{
                    this.number = $(".data_num").val()-1;
                    if(this.number<1){
                        this.number = 1;
                    }
                    $(".data_num").val(this.number);
                })
                $(".add").on("click",()=>{
                    this.number = Number($(".data_num").val()) + 1;
                    $(".data_num").val(this.number);
                })
                $(".data_num").on("blur",()=>{
                    this.number = Number($(".data_num").val());
                })

            }
            //尺寸颜色的变化
            sizecolor(){
                $(".size").on("click","div",(e)=>{
                    for(let i = 0 ; i< $(".size").children().length ; i++){
                        $(".size").children()[i].classList.remove("ac");
                    }
                    e.currentTarget.classList.add("ac");
                })
            }
            //加入购物车
            addCar(){
                this.sizecolor();
                //获取选择的衣服的尺寸大小
                this.size = "";
                $(".size").on("click","div",(e)=>{
                    this.size = e.currentTarget.innerHTML;
                    this.obj = {
                        id:this.id,
                        title:this.title,
                        image:this.image,
                        price:this.price,
                        size:this.size,
                        number:this.number,
                        index :this.index
                    }
                })

                $(".addcar").on("click", ()=>{
                    var _this = this;
                    if(this.size ==""){
                        alert("请选择尺寸大小");
                    }else {
                        var hasgoods = localStorage.getItem("goods");
                        console.log(hasgoods)
                        if(hasgoods){
                            var arr1 = JSON.parse(hasgoods);
                                var i =0;
                                if(arr1.some(function (item ,index) {
                                    i = index;
                                    console.log(item)
                                    return item.id == _this.id;
                                })){
                                    arr1[i].number = arr1[i].number + this.number;
                                    localStorage.setItem("goods",JSON.stringify(arr1));
                                }else {
                                    console.log(this.obj.index);
                                    arr1.push(this.obj);
                                    localStorage.setItem("goods",JSON.stringify(arr1));
                                }
                                $(".incar").show();

                        }else {
                            var arr = [this.obj];
                            localStorage.setItem("goods",JSON.stringify(arr));
                            $(".incar").show();
                        }
                    }
                })
            }
        }
         new Detil();
    })
})
