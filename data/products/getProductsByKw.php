<?php
header("Content-Type:application/json");
require_once("../init.php");

@$kw=$_REQUEST["kw"];
$sql="select *,(select md from xz_laptop_pic where lid=lid limit 1) as md from xz_laptop";
if($kw){
    //将$kw按空格切开为数组
    $kws=explode(" ",$kw);
    //遍历$kws
    for($i=0;$i<count($kws);$i++){
        //将$kws中当前位置的关键词替换为title like ‘%。。。%’
        $kws[$i]=" title like '%$kws[$i]%' ";
    }
    //将$kws用“ and ”连接为一个条件字符串$where
    $where=implode(" and ",$kws);
    //$sql=$sql." where ".$where
    $sql.=" where $where ";
};

$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
//获得商品总数
$count=count($data);
@$pageNo=$_REQUEST["pageNo"];
if($pageNo==null) $pageNo=1;
@$pageSize=$_REQUEST["pageSize"];
if($pageSize==null) $pageSize=9;
//sql语句：分页查询，每页9件商品
$sql.=" limit ".($pageNo-1)*$pageSize.",$pageSize ";
$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);

$pageCount=ceil(($count/$pageSize));
$output=[
    "pageNo"=>$pageNo,
    "pageSize"=>$pageSize,
    "count"=>$count,
    "pageCount"=>$pageCount,
    "data"=>$data
];
echo json_encode($output);


