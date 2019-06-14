<?php
//data/users/login.php
//引入init.php
require_once("../init.php");
//获得uname
@$uname=$_REQUEST["uname"];
//获得upwd
@$upwd=$_REQUEST["upwd"];
//如果uname和upwd存在，在sql选取相应的uid，密码不分大小写，并返回索引数组
if($uname&&$upwd){
    $sql="select uid from xz_user where uname='$uname' and binary upwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    //抓取一个索引数组
    $row=mysqli_fetch_row($result);
    //如果该数组存在
    if($row){//开启session
        session_start();
        //将索引数组对应session中的uid
        $_SESSION["uid"]=$row[0];
        //返回true
        echo "true";
    }else{//否则返回false
        echo "false";
    }
}else{
    echo "false";
}