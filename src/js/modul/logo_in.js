define(["jquery","Header"],function ($,header) {
    class Logo_in {
        constructor(){
            this.init().then(()=>{
                this.close();
                this.sign_in();
                this.hasSessionStorage();
                this.logo_in();
                this.change();
            });
        }
        init(){
            return new Promise(function (resolve, reject) {
                $(".logoIn").load("/html/modul/logo_in.html",function () {
                    resolve();
                });
            })
        }
        //登录框的关闭按钮
        close(){
            $(".close").on("click",function () {
                $(".logoIn").toggle();
            })
        }
        //从登录跳转到注册页面
        sign_in(){
            $(".data_sign").on("click",function () {
                location.href = "html/sign_in.html";
            })
        }
        //判断是否有logo_in回话存储，有就进行header的切换
        hasSessionStorage(){
            this.SessionStorage = sessionStorage.getItem("logo_in");
            if(this.SessionStorage){
                this.SessionStorage = JSON.parse(this.SessionStorage);
                $(".data_name").val(this.SessionStorage.username);
                $(".data_psd").val(this.SessionStorage.userpsd);
            }
        }
        //登录按钮
        logo_in(){
            $(".data_lo_in_btn").on("click", (e)=>{
                var obj = {
                    username:$(".data_name").val(),
                    userpsd:$(".data_psd").val()
                }
                $.ajax({
                    type: "POST",
                    url: "http://localhost/php/logo_in.php",
                    data: `username=${$(".data_name").val()}&userpsd=${$(".data_psd").val()}`,
                    success: function(msg){
                        console.log(JSON.parse(msg));
                        if(JSON.parse(msg).res_code == 1){
                            sessionStorage.clear("logo_in");
                            sessionStorage.setItem("ok_logo_in",JSON.stringify(obj));
                            $(".logoIn").toggle();
                            header.getSe();
                        }else {
                            alert(JSON.parse(msg).res_message);
                        }
                    }
                });
            })
        }
        //微信QQ颜色切换
        change(){
            $(".data_qq").on("click",function () {
                $(".data_wx").removeClass("ac");
                $(".data_qq").addClass("ac");
                $(".sign_in_show").show();
                $(".sign_in_hide").hide();
            })
            $(".data_wx").on("click",function () {
                $(".data_wx").addClass("ac");
                $(".data_qq").removeClass("ac");
                $(".sign_in_show").hide();
                $(".sign_in_hide").show();
            })
        }
    }
    return new Logo_in();
})