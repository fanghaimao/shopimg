var myFunction = {
    /*获取元素的样式
    * @ pram obj dom元素对象
    * @pram  str  获取元素的属性名称
    * */
    getStyle: function (obj, str) {
        if (getComputedStyle) {
            return getComputedStyle(obj, false)[str];
        } else {
            return obj.currentStyle(str);
        }
    },
    /* 让元素在body内绝对居中
	 * @param obj  DOMObj 要居中的那个元素
	 * @param obj1 Dom可选参数 obj1在obj元素内部居中
	 */
    showCenter: function (obj, obj1) {
        if (arguments.length < 2) {
            obj.style.position = "absolute";
            var _this = this;
            window.onresize = (function center() {
                var left = (_this.getBody().width - obj.offsetWidth) / 2,
                    top = (_this.getBody().height - obj.offsetHeight) / 2;
                _this.css(obj, {left: left + "px", top: top + "px"});
                return center;
            })();
        } else {
            obj1.style.position = "absolute";
            obj.style.position = "relative";
            var _this = this;
            window.onresize = (function center() {
                var left = (obj.offsetWidth - obj1.offsetWidth) / 2,
                    top = (obj.offsetHeight - obj1.offsetHeight) / 2;
                console.log(obj.offsetWidth, obj1.offsetWidth);
                _this.css(obj1, {left: left + "px", top: top + "px"});
                return center;
            })();
        }
    },
    /*
    * 获取或设置样式
    * @param obj DOM对象
    * @param attr string 获取属性 || obj 设置样式
    * */
    css: function (obj, attr) {
        if (typeof attr == "string") {
            //获取
            return this.getStyle(obj, attr);
        }
        if (typeof attr == "object") {
            for (let item in attr) {
                obj.style[item] = attr[item];
            }
        }
    },
    /*计算一个元素到body边缘的距离
    * @param obj Dom元素
    * @return object {top,left}
    * */
    getBodyDis(obj) {
        let left = 0, top = 0;
        if (this.css(obj, "position") == "fixed") {
            return console.log("当前dom处于fixed定位，不能获取到body的大小");
        } else {
            //思想只要父级不为空就往上走
            while (obj.offsetParent != null) {
                //offset与边框相加
                left = left + obj.offsetLeft + obj.clientLeft;
                top = top + obj.offsetTop + obj.clientTop;
                obj = obj.offsetParent;
            }
            return {
                "left": left,
                "top": top,
            }
        }
    },
    /*获取浏览器的宽和高(body)*/
    getBrowser() {
        return {
            width: document.documentElement.clientWidth || document.body.clientWidth,
            height: document.documentElement.clientHeight || document.body.clientHeight
        };
    },
    /*事件监听
    * @param obj dom对象 监听事件的对象
    * @param attr  string 所监听的是什么事件
    * @param fn  Function 执行函数
    * @param [isBubbling] boole 冒泡执行还是捕获 默认冒泡
    * */
    listenEvent(obj, attr, fn, isBubbling) {
        if (isBubbling === undefined) {
            isBubbling = false;
        }
        if (obj.attachEvent) {
            //ie只能在冒泡阶段执行函数
            obj.attachEvent("on" + attr, fn);
        } else {
            obj.addEventListener(attr, fn, isBubbling);
        }
    },
    /* 移出监听事件
* @param obj DOMObj 移出监听事件的对象
* @param attr string 事件句柄
* @param fn   function 事件处理函数
*/
    off: function (obj, attr, fn) {
        if (obj.detachEvent) {
            obj.detachEvent("on" + attr, fn);
        } else {
            obj.removeEventListener(attr, fn);
        }
    },
    /*让元素匀速运动
    * @param obj dom 运动的元素
    * @param attr string 运动的方向
    * @param end number 终点的地方
    * @time number 运动时间
    * */
    moveElement(obj, attr, end, time) {
        //每次进来之前先把上一次的定时器清除掉
        clearInterval(obj.timer);
        //起始值
        var star = parseInt(this.getStyle(obj, attr));
        //总距离
        var distance = end - star;
        //总步数
        var steps = Math.floor(time / 30);
        //v
        var speed = distance / steps;
        obj.timer = setInterval(function () {
            //往前走一步
            star += speed;
            if (Math.abs(end - star) <= Math.abs(speed)) {
                star = end;
                clearInterval(obj.timer);
            }
            obj.style[attr] = star + "px";
        }, 30);
    },
    /* cookie的操作（存取）
	 * @param key   string  存取的key值
	 * @param [value] string  如果传入value，那么就是存cookie，不传就是取cookie
	 * @param [option] object  {expires, path}
	 * @return  string 取cookie的时候返回的当前cookie的值
	 * 示例 cookie("cart", JSON.stringify(obj), {"path": "/", "expires": 5});
	 */
    cookie : function (key, value, option) {
        if(value === undefined){
            // 取cookie
            var cookie = document.cookie;
            var arr = cookie.split("; ");
            var obj = {};
            arr.forEach(function(ele){
                var subarr = ele.split("=");
                obj[subarr[0]] = decodeURIComponent(subarr[1]);
            })
            // 判断
            return obj[key] ? obj[key] : "";
            /* if(obj[key]){
                return obj[key];
            }else {
                return "";
            } */

        }else{
            //存
            var str = key+"="+encodeURIComponent(value);
            if(option){
                // path
                if(option.path){
                    str += ";path="+option.path;
                }
                if(option.expires) {
                    var date = new Date();
                    // 把过期日期设置为option.expires天之后
                    date.setDate(date.getDate() + option.expires);
                    str += ";expires=" + date;
                }
            }

            document.cookie = str;
        }
    },
    /*ajax请求数据
    *@param get/post string get/post 请求方式
    *@param obj  object 请求参数
    *@param url string 请求地址
    *@param successFunction  Function/callback 成功回调
    *@param fileFunction Function/callback  失败回调
    *@param isJson  boolean 返回是否是json数据格式"get","o.php",suc ,file
    * jsonp  全局函数名为successFunction string
    * */
    ajax: function (method, obj, url, successFunction, fileFunction, isJson) {
        if (method == "get" || method == "GET") {
            var xhr = new XMLHttpRequest();
            if (typeof obj == "object") {
                url = url + "?";
                for (let key in obj) {
                    url = url + key + "=" + obj[key] + "&";
                }
                url = url.slice(0, -1);
            }
            xhr.open(method, url);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (isJson == undefined) {
                            isJson = true;
                        }
                        if (isJson) {
                            try
                            {
                                var res = JSON.parse(xhr.responseText);
                            }
                           catch {
                                 var res = xhr.responseText
                           }

                        } else {
                                 var res = xhr.responseText;
                        }
                        successFunction && successFunction(res);
                    } else {
                        fileFunction && fileFunction();
                    }
                }
            }
        }
        if (method == "post" || method == "POST") {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (typeof obj == "object") {
                var str = "";
                for (let key in obj) {
                    str += key + "=" + obj[key] + "&";
                }
                var str1 = str.slice(0, -1);
            }
            xhr.send(str1);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (isJson == undefined) {
                            isJson = true;
                        }
                        if (isJson) {
                            var res = JSON.parse(xhr.responseText);
                        } else {
                            var res = xhr.responseText;
                        }
                        successFunction && successFunction(res);
                    } else {
                        fileFunction && fileFunction();
                    }
                }
            }
        }
        if (method == "jsonp" || method == "JSONP") {
            var script = document.createElement("script");
            var url = url + "?cb=" + successFunction;
            if (typeof obj == "object") {
                for (var key in obj) {
                    url = url + "&" + key + "=" + obj[key];
                }
            }
            script.src = url;
            document.body.appendChild(script);
            document.body.removeChild(script);
        }
    },
    /*promise封装ajax，让一步代码同步化
    *@param methods string "get/post";
    *@param  obj object 请求数据
    *@param url string 请求地址
    *@param isJson boolean 是否返回json 默认true
    *@param cb string jsonp请求时回调 (全局函数名)
    * */
    ajaxPromise: function (method, obj, url, isJson) {
        return new Promise(function (resolve, reject) {
            if (method == "get" || method == "GET") {
                var xhr = new XMLHttpRequest();
                if (typeof obj == "object") {
                    url = url + "?";
                    for (let key in obj) {
                        url = url + key + "=" + obj[key] + "&";
                    }
                    url = url.slice(0, -1);
                }
                xhr.open(method, url);
                xhr.send(null);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (isJson == undefined) {
                                isJson = true;
                            }
                            if (isJson) {
                                var res = JSON.parse(xhr.responseText);
                            } else {
                                var res = xhr.responseText;
                            }
                            resolve(res);
                            ``
                        } else {
                            reject(res);
                        }
                    }
                }
            }
            if (method == "post" || method == "POST") {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                if (typeof obj == "object") {
                    var str = "";
                    for (let key in obj) {
                        str += key + "=" + obj[key] + "&";
                    }
                    var str1 = str.slice(0, -1);
                }
                xhr.send(str1);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (isJson == undefined) {
                                isJson = true;
                            }
                            if (isJson) {
                                var res = JSON.parse(xhr.responseText);
                            } else {
                                var res = xhr.responseText;
                            }
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    }
                }
            }
        })
    }
}

//毫秒时间格式转换
var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
    //alert(format(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'))
}