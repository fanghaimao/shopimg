require.config({
    baseUrl:'/',
    paths:{
        "jquery" : "lib/jquery-1.11.3",
        "jquery1":"lib/big/dome/js/jquery.min",
        "Header" : "js/modul/headerModul",
        "Footer" : "js/modul/footerModul",
        "Logo_in": "js/modul/logo_in",
        "Swiper": "lib/swiper/js/swiper",
        "art_template" : "lib/art-template/template-web",
        "imgbig":"lib/big/fangda/js/mzp-packed",
        "zoom" : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "fly" : "lib/fly/dist/jquery.fly.min"
    },
    shim : {
        "zoom" : {
            deps: ["jquery"]
        }
    }
})