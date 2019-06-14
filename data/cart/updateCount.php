<?php
//data/cart/updateCount.php
//连接到init.php
require_once("../init.php");
//获得iid和count
@$iid=$_REQUEST["iid"];
@$count=$_REQUEST["count"];
//如果iid和count不为空
if($iid!==null&&$count!==null)
    //判断如果count==0
    if($count==0)
        //那么删除该条iid
        $sql="delete from xz_shoppingcart_item where iid=$iid";
    //否则更新该条iid的count
    else
        $sql="update xz_shoppingcart_item set count=$count where iid=$iid";
//执行这条sql语句
mysqli_query($conn,$sql);

