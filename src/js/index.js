require(["config"],function () {
    require(["jquery","Header","Footer","Logo_in","Swiper"],function ($,header,footer,logo_in,Swiper) {
            class Index{
                constructor(){
                    this.init()
                }
                init(){
                    this.lb();
                    this.getData();
                    this.listGoods();

                }

                //轮播
                lb(){
                    var mySwiper = new Swiper ('.swiper-container', {
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable :true,
                        },
                        autoplay:{
                            delay: 3000,
                            disableOnInteraction: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },

                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    })
                }
                //获取数据
                getData(){
                    $.ajax({
                        type: "get",
                        url: "http://rap2api.taobao.org/app/mock/data/897257",
                        data: "",
                        success: function(msg){
                            // console.log(msg)
                        }
                    });
                }
                //跳转列表页
                listGoods(){
                   var jqdom =  $(".goods_box").children();
                   console.log(jqdom)
                   for(let i = 0;i<jqdom.length;i++){
                       jqdom[i].onclick = function(e){
                         var type = e.srcElement.parentElement.className.slice(4);
                           location.href = "/html/list.html?type="+type
                       }
                   }
                }

            }
             new  Index();
    })
})