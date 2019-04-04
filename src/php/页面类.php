<?php
	// 连接数据库
	mysql_connect("localhost", "root", "");
	mysql_select_db("user");
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	$sumdata = "select * from type";
	$sumdata1 = mysql_query($sumdata);
   if(mysql_num_rows($sumdata1)>= 1){
       $arr =array();
            while($row = mysql_fetch_assoc($sumdata1)){
               array_push($arr,$row);
            }
   	        echo json_encode(array('res_code' => 1, 'res_list' => array('data' => $arr)));
  	}else{
       echo json_encode(array('res_code' => 0, 'res_message' => "暂无数据"));
  	}
?>