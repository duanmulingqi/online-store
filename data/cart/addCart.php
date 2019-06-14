<?php
//data/cart/addCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
//编写sql语句：选取当前用户user_id所购买的物品product_id
$sql="select * from xz_shoppingcart_item where user_id=$uid and product_id=$lid";
//执行sql语句
$result=mysqli_query($conn,$sql);
//抓取一个索引数组
$row=mysqli_fetch_row($result);
//如果为空，添加至数据库
if($row==null){
    $sql="insert into xz_shoppingcart_item (user_id,product_id,count,is_checked) values ($uid,$lid,$count,0)";
    }else{//否则，更改sql
        $sql="update xz_shoppingcart_item set count=count+$count where user_id=$uid and product_id=$lid";
    }
mysqli_query($conn,$sql);
