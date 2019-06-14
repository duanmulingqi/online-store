<?php
//data/users/islogin.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
//查看session中是否有缓存的uid
@$uid=$_SESSION["uid"];
if($uid==null)
    echo json_encode(["ok"=>0]);
else{//如果有则返回相应的名字
    $sql="select uname from xz_user where uid=$uid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    echo json_encode(["ok"=>1,"uname"=>$row[0]]);
}