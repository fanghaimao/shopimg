define(["jquery"],function ($) {
    class Footer{
        constructor(){
            this.init();
        }
        init(){
            return new Promise(function (resolve,reject) {
                $(".footer").load("/html/modul/Footer.html",function () {
                    resolve();
                })
            })
        }
    }
    return new Footer();
})