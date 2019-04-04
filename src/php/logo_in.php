<?php
    $name = $_POST["username"];
    $psd = $_POST["userpsd"];
    header("Access-Control-Allow-Origin:*");

    header('Access-Control-Allow-Methods:POST');

    header('Access-Control-Allow-Headers:x-requested-with, content-type');
	// 连接数据库
	mysql_connect("localhost", "root", "");
	mysql_select_db("yxlm");
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	$sersql = "select * from qqusers  where qqname = '$name' and qqpsd = '$psd'";
	$resser = mysql_query($sersql);
	if(mysql_num_rows($resser)>= 1){
	 echo json_encode(array('res_code' => 1, 'res_message' => "登录成功"));
	}else{
     echo json_encode(array('res_code' => 0, 'res_message' => "用户名或密码错误"));
	}

?>