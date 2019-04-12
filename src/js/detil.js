require(["config"], function () {
    require(["jquery","Logo_in", "Header", "art_template", "zoom","", "imgbig"], function ($,Logo_in, header, art_template,zoom) {
        class Detil {
            constructor() {
                this.number = 1;
                this.init();
            }

            init() {
                this.getData();
            }

            getData() {
                this.discription = location.search.slice(1);
                $.ajax({
                    type: "get",
                    url: "http://localhost/php/xiangqing.php",
                    data: this.discription ,
                    success: (msg) => {
                        var msg = JSON.parse(msg);
                        console.log(msg)
                        this.id = msg.res_list.data[0].id;
                        this.title = msg.res_list.data[0].title;
                        this.image = msg.res_list.data[0].img1;
                        this.price = msg.res_list.data[0].price;
                        var imgs = msg.res_list.data[0].bg;
                        if(imgs){
                            imgs = imgs.split(",");
                            msg.res_list.data[0].bg = imgs;
                        }else {
                            msg.res_list.data[0].bg = "";
                        }
                        var html = art_template("box", {...msg.res_list.data[0]});
                        $(".contain").html(html);
                        // this.fangda();
                        this.buynum();
                        this.addCar();
                        this.zoom();
                        //this.fly();
                    }
                })
            }

            //购买数量的加减
            buynum() {

                $(".dis").on("click", () => {
                    this.number = $(".data_num").val() - 1;
                    if (this.number < 1) {
                        this.number = 1;
                    }
                    $(".data_num").val(this.number);
                })
                $(".add").on("click", () => {
                    this.number = Number($(".data_num").val()) + 1;
                    $(".data_num").val(this.number);
                    console.log(this.number);
                })
                $(".data_num").on("blur", () => {
                    this.number = Number($(".data_num").val());
                })

            }

            //尺寸颜色的变化
            sizecolor() {
                $(".size").on("click", "div", (e) => {
                    for (let i = 0; i < $(".size").children().length; i++) {
                        $(".size").children()[i].classList.remove("ac");
                    }
                    e.currentTarget.classList.add("ac");
                })
            }

            //加入购物车
            addCar() {
                this.sizecolor();
                //获取选择的衣服的尺寸大小
                this.obj = {
                    id: this.id,
                    title: this.title,
                    image: this.image,
                    price: this.price,
                    size: this.size,
                    number: this.number,
                    index: this.index,
                    type: this.discription
                }
                this.size = "";
                $(".size").on("click", "div", (e) => {
                    this.size = e.currentTarget.innerHTML;
                    this.obj.size = this.size ;
                })

                $(".addcar").on("click", () => {
                    var _this = this;
                    if (this.size == "") {
                        alert("请选择尺寸大小");
                    } else {
                        var hasgoods = localStorage.getItem("goods");
                        if (hasgoods) {
                            this.obj.number = this.number;
                            console.log(this.obj);
                            var arr1 = JSON.parse(hasgoods);
                            var i = 0;
                            if (arr1.some(function (item, index) {
                                i = index;
                                return item.id == _this.id;
                            })) {
                                arr1[i].number = arr1[i].number + this.number;
                                localStorage.setItem("goods", JSON.stringify(arr1));
                            } else {
                                arr1.push(this.obj);
                                localStorage.setItem("goods", JSON.stringify(arr1));
                            }
                            $(".incar").show();

                        } else {
                           this.obj.number = this.number;
                           console.log(this.obj);
                            var arr = [this.obj];
                            localStorage.setItem("goods", JSON.stringify(arr));
                            $(".incar").show();
                        }
                    }
                })
            }
            //fly
          /*  fly(){
                jQuery(function($) {
                    $('#fly').fly({
                        start:{
                            left: 11,  //开始位置（必填）#fly元素会被设置成position: fixed
                            top: 600,  //开始位置（必填）
                        },
                        end:{
                            left: 500, //结束位置（必填）
                            top: 130,  //结束位置（必填）
                            width: 100, //结束时高度
                            height: 100, //结束时高度
                        },
                        autoPlay: false, //是否直接运动,默认true
                        speed: 1.1, //越大越快，默认1.2
                        vertex_Rtop:100, //运动轨迹最高点top值，默认20
                        onEnd: function(){} //结束回调
                });
                    $('#fly').play(); //autoPlay: false后，手动调用运动
                    $('#fly').destroy(); //移除dom
                });
            }*/
            /*//放大镜插件
            fangda() {
                function jQuery1(e) {
                    return document.getElementById(e);
                }

                document.getElementsByClassName = function (cl) {
                    var retnode = [];
                    var myclass = new RegExp('\\b' + cl + '\\b');
                    var elem = this.getElementsByTagName('*');
                    for (var i = 0; i < elem.length; i++) {
                        var classes = elem[i].className;
                        if (myclass.test(classes)) retnode.push(elem[i]);
                    }
                    return retnode;
                }
                var MyMar;
                var speed = 1; //速度，越大越慢
                var spec = 1; //每次滚动的间距, 越大滚动越快
                var ipath = '/image/'; //图片路径
                var thumbs = document.getElementsByClassName('thumb_img');
                console.log(thumbs);
                for (var i = 0; i < thumbs.length; i++) {
                    thumbs[i].onmouseover = function () {
                        jQuery1('main_img').src = this.rel;
                        jQuery1('main_img').link = this.link;
                    };
                    thumbs[i].onclick = function () {
                        location = this.link
                    }
                }
                jQuery1('main_img').onclick = function () {
                    location = this.link;
                }
                jQuery1('gotop').onmouseover = function () {
                    this.src = ipath + 'gotop2.gif';
                    MyMar = setInterval(gotop, speed);
                }
                jQuery1('gotop').onmouseout = function () {
                    this.src = ipath + 'gotop.gif';
                    clearInterval(MyMar);

                }
                jQuery1('gobottom').onmouseover = function () {
                    this.src = ipath + 'gobottom2.gif';
                    MyMar = setInterval(gobottom, speed);
                }
                jQuery1('gobottom').onmouseout = function () {
                    this.src = ipath + 'gobottom.gif';
                    clearInterval(MyMar);
                }

                function gotop() {
                    jQuery1('showArea').scrollTop -= spec;
                }

                function gobottom() {
                    jQuery1('showArea').scrollTop += spec;
                }
            }*/
            zoom() {
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                    gallery: 'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'current',
                    borderSize: '1',
                    borderColor: '#c5c5c5'
                });
            }

        }

        new Detil();
    })
})
