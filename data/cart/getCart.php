<?php
//data/cart/getCart.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=3;//$_SESSION["uid"];
$sql="select iid,lid,(select sm from xz_laptop_pic where laptop_id=lid limit 1) as sm,title,spec,count,price,is_checked from xz_shoppingcart_item inner join xz_laptop on product_id=lid where user_id=3";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));