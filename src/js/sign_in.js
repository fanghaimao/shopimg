class Sign_in {
    constructor(){
        this.init();
    }
    init(){
       this.getDom();
       this.click();
    }
    getDom(){
        this.username = document.querySelector(".username");
        this.userpsd = document.querySelector(".userpsd");
        this.data_btn = document.querySelector(".data_btn");
        this.phone = document.querySelector(".number");
        this.okserver = document.querySelector(".okser");
    }
    click(){
        var _this = this;
        this.data_btn.onclick = (e)=>{
            if(this.okserver.checked){
                this.send().then(function () {
                    if(confirm("跳转到登录页面")){
                        sessionStorage.setItem("logo_in",JSON.stringify(_this.obj));
                        // myFunction.cookie("logo_in",JSON.stringify(_this.obj),{path:"/"});
                        location.href = "/index.html";
                    }
                });

            }else {
                alert("请同意服务条款");
            }
        }
    }
    send(){
            this.obj = {
                username:this.username.value,
                userpsd:this.userpsd.value,
                phone:this.phone.value
            }
           return myFunction.ajaxPromise("post",this.obj,'http://localhost/php/sign_in.php');
    }
}
new Sign_in();