class Sign_in {
    constructor(){
        this.init();
    }
    init(){
       this.getDom();
       this.click();
       this.scroll();
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
    //轮播
    scroll(){
        this.index = 0;
        this.last = 0;
        this.aimg = document.querySelector(".bg").querySelectorAll("img");
        setInterval(()=>{
            for(let i = 0 ; i < this.aimg.length-1 ; i++){
                console.log(   this.aimg[this.index],this.aimg[this.last]);
                console.log(this.index,this.last)
                this.aimg[this.last].classList.remove("ac");
                this.aimg[this.index].classList.add("ac");
                console.log(   this.aimg[this.index],this.aimg[this.last]);
                this.last = this.index ;
                this.index++;
                if(this.index > this.aimg.length-1){
                    this.index = 0;
                }
            }
        },5000)
    }
}
new Sign_in();