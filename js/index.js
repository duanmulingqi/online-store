//广告轮播
$(()=>{
	var LIWIDTH=960,
		timer=null,
		moved=0,
		duration=500,
		wait=3000;
	$.get(
		"data/index/getCarousel.php",
	).then(data=>{
		var html="";
		for(var p of data){
			html+=`<li>
              	<a href="${p.href}" title="${p.title}">
                <img src="${p.img}"></a>
            	</li>`
		}
		var p0=data[0];
		html+=`<li>
              	<a href="${p0.href}" title="${p0.title}">
              	<img src="${p0.img}"></a>
            	</li>`
		var $ul=$("[data-load=bannerImgs]");
		$ul.html(html).css("width",LIWIDTH*(data.length));
		//导航小点
		var $ulInds=$("[data-load=bannerInds]");
		$ulInds.html("<li></li>".repeat(data.length)).children().first().addClass("hover");

		function move(){
			$ul.animate({
				//右移的距离为每个图片的宽度*移动数量
				left:-LIWIDTH*moved
			},duration,function(){
				if(moved==4){
					moved=0;
					$ul.css("left",0)
				}
				//设置所对应的小圆点背景为蓝色
				$ulInds.children(`:eq(${moved})`).addClass("hover").siblings().removeClass("hover")
			})
		}
		//使用定时器实现自动轮播
		var timer=setInterval(()=>{
			//记录每个移动图片的数量
			moved++;move();
		},wait+duration)
		$ulInds.on("mouseover","li",e=>{
			moved=$(e.target).index();
			//防动画/定时器叠加
			clearInterval(timer);
			$ul.stop(true);
			move();
		})
		//鼠标悬停在图片即停止轮播事件
		$("#banner").hover(
			()=>clearInterval(timer),
			()=>{
				timer=setInterval(()=>{
					moved++;move();
				},wait+duration)
			}
		)
		//轮播图右键右移
		$("[data-move=right]").click(()=>{
			if(!$ul.is(":animated")){
				moved++;
				move();
			}
		})
		$("[data-move=left]").click(()=>{
			if(!$ul.is(":animated")){
				if(moved==0){
					$ul.css("left",-LIWIDTH*data.length)
					moved=4;
				}
				moved--;
				move();
			}
		})
	});
});
//加载楼层1
$(()=>{
	$.ajax({
		type:"get",
		url:"data/index/getFloor1.php",
		dataType:"json"
	}).then(resData=>{
		var html="";
		for(var i=0;i<resData.length;i++){
			var p=resData[i];
			html+=
			i<2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			i==2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			`<div class="product">
				<img src="${p.pic}">
				<p class="name">${p.title}</p>
				<p class="price">¥${p.price}</p>
				<a href="${p.href}">查看详情</a>
			</div>`;
		}
		document.querySelector("#f1 .floor-content").innerHTML=html;
	})
});
//加载楼层2
$(()=>{
	$.ajax({
		type:"get",
		url:"data/index/getFloor2.php",
		dataType:"json"
	}).then(resData=>{
		var html="";
		for(var i=0;i<resData.length;i++){
			var p=resData[i];
			html+=
			i<2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			i==2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			`<div class="product">
				<img src="${p.pic}">
				<p class="name">${p.title}</p>
				<p class="price">¥${p.price}</p>
				<a href="${p.href}">查看详情</a>
			</div>`;
		}
		document.querySelector("#f2 .floor-content")
						.innerHTML=html;
	})
});
//加载楼层3
$(()=>{
	$.ajax({
		type:"get",
		url:"data/index/getFloor3.php",
		dataType:"json"
	}).then(resData=>{
		var html="";
		for(var i=0;i<resData.length;i++){
			var p=resData[i];
			html+=
			i<2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			i==2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			`<div class="product">
				<img src="${p.pic}">
				<p class="name">${p.title}</p>
				<p class="price">¥${p.price}</p>
				<a href="${p.href}">查看详情</a>
			</div>`;
		}
		document.querySelector("#f3 .floor-content")
						.innerHTML=html;
	})
});

//楼层滚动
$(()=>{
	$(window).scroll(()=>{
		var scrollTop=$(window).scrollTop();//document.documentElement.scrollTop||document.body.scrollTop;//获得超出文档显示区域的距离
		var $f1=$(".floor:first");
		var offsetTop=$f1.offset().top;//当前元素到其顶部的距离
		if(offsetTop<=scrollTop+innerHeight/2){//innerHight文档显示区域的高度
			$("#lift").show();
		}else{
			$("#lift").hide();
		}
		//楼层变亮
		//1.先找到所有楼层
		var $floors=$(".floor");
		//循环遍历每个楼层，找到当前楼层
		for(var i=0;i<$floors.length;i++){
			var $f=$($floors[i]);
			//如果该楼层过线即退出遍历
			if($f.offset().top>scrollTop+innerHeight/2){
				break;
			}
		}
		//点亮当前导航页以及去除其兄弟元素的效果
		$(`#lift>ul>li:eq(${i-1})`)
			.addClass("lift_item_on")
			.siblings().removeClass("lift_item_on");
		});

		$("#lift>ul").on("click","a.lift_btn",function() {
			var $a = $(this);
			var i = $a.parent().index();
			var $offsetTop = $(`.floor:eq(${i})`).offset().top;
			$("html").stop(true).animate({
				scrollTop: $offsetTop - 50
		},500);
		})
})