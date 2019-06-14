//页面初始化
(()=>{
	var lid=location.search.split("=")[1];//"?lid=1"
	ajax({
		type:"get",
		url:"data/products/getProductByLid.php",
		data:"lid="+lid,
		dataType:"json"
	}).then(output=>{
		var {product,specs,imgs}=output;
		document.querySelector("#show-details>h1").innerHTML=product.title;
		document.querySelector("#show-details>h3>a").innerHTML=product.subtitle;
		document.querySelector("#show-details .stu-price>span").innerHTML=product.price;
		document.querySelector("#show-details .promise>span").innerHTML=product.promise;
		var html="";
		for(var spec of specs){
			html+=`<a href="product-details.html?lid=${spec.lid}" class=${
				spec.lid===product.lid?"active":""
				}>${spec.spec}</a>`
		}
		//规格
		document.querySelector("#show-details .spec>div").innerHTML=html;
		//产品参数
		var {title,os,memory,resolution,video_card,cpu,video_memory,category,disk,details}=product;
		document.querySelector("#param>ul").innerHTML=`<li>
              <a href="javascript:;">商品名称：${title}</a>
            </li>
            <li>
              <a href="javascript:;">系统：${os}</a>
            </li>
            <li>
              <a href="javascript:;">内存容量：${memory}</a>
            </li>
            <li>
              <a href="javascript:;">分辨率：${resolution}</a>
            </li>
            <li>
              <a href="javascript:;">显卡型号：${video_card}</a>
            </li>
            <li>
              <a href="javascript:;">处理器：${cpu}</a>
            </li>
            <li>
              <a href="javascript:;">显存容量：${video_memory}</a>
            </li>
            <li>
              <a href="javascript:;">分类：${category}</a>
            </li>
            <li>
              <a href="javascript:;">硬盘容量：${disk}</a>
            </li>`
		//详细参数图片
		document.querySelector("#product-intro").innerHTML=details;
		//商品图片
		var html="";
		for(var pic of imgs){
			html+=`<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`;
		}
		var ul=document.querySelector("#icon_list")
        ul.innerHTML=html;
		ul.style.width=62*imgs.length+"px";
		//图片小于5张时，禁用右键轮播图片
        if(imgs.length<=5)
		    document.querySelector("#preview>h1>a.forward").className="forward disabled";
		document.querySelector("#mImg").src=imgs[0].md;
		document.querySelector("#largeDiv").style.backgroundImage=`url(${imgs[0].lg})`;
	})
})();

//放大镜功能
(()=>{
	//提取元素backward disabled
	var aBackward=document.querySelector("#preview>h1>a:first-child");
	//提取元素forward
	var aForward=document.querySelector("#preview>h1>a:nth-child(2)");
	var ul=document.getElementById("icon_list");
	var LIWIDTH=62,OFFSET=20,moved=0;
	//给aForward绑定单击事件
	aForward.onclick=e=>{
		if(e.target.className.indexOf("disabled")==-1)
		move(1);
	};
	//给aBackward绑定单击事件
	aBackward.onclick=e=>{
		if(e.target.className.indexOf("disabled")==-1)
		move(-1);
	};
	function move(dir){
		moved+=dir;
		var left=-LIWIDTH*moved+OFFSET;
		ul.style.left=left+"px";
		checkA();
	}
	var mImg=document.getElementById("mImg"),       largeDiv=document.getElementById("largeDiv"),
        mask=document.getElementById("mask"),
        supermask=document.getElementById("superMask");
	ul.onmouseover=e=>{
	    if(e.target.nodeName=="IMG"){
	        mImg.src=e.target.dataset.md;
	        largeDiv.style.backgroundImage=`url(${e.target.dataset.lg})`;
        }
    };
    supermask.onmouseover=()=>{
	    mask.style.display=largeDiv.style.display="block";
    };
    supermask.onmouseout=()=>{
	    mask.style.display=largeDiv.style.display="none";
    };
    var MAX=175;
    supermask.onmousemove=e=>{
	    var offsetX=e.offsetX,offsetY=e.offsetY;
	    var top=offsetY-175/2,
            left=offsetX-175/2;
	    //top<0?(top=0):top>175?(top=175):
	    top=top<0?0:top>175?175:top;
        //left<0?(left=0):left>175?(left=175)
        left=left<0?0:left>175?175:left;
	    mask.style.top=top+"px";
	    mask.style.left=left+"px";
	    largeDiv.style.backgroundPosition=-left*16/7+"px "+(-top*16/7)+"px";
    };
	//负责检查两个按钮的状态
	function checkA(){
		if (moved==0){
		    aBackward.className="backward disabled";
        } else if(ul.children.length-moved==5){
		    aForward.className="forward disabled";
        }else{
		    aBackward.className="backward";
		    aForward.className="forward"
        }
	}
})()






/*(()=>{
	var lid=location.search.split("=")[1];//"?lid=1"
	ajax({
		type:"get",
		url:"data/products/getProductByLid.php",
		data:"lid="+lid,
		dataType:"json"
	}).then(output=>{
		var {product,specs,imgs}=output;
		var {title, subtitle, price, promise}=product;
		document.querySelector("#show-details>h1")
						.innerHTML=title;
		document.querySelector("#show-details>h3>a")
						.innerHTML=subtitle;
		document.querySelector("#show-details .stu-price>span")
						.innerHTML="¥"+price;
		document.querySelector("#show-details .promise>span")
						.innerHTML=promise;
		var html="";
		for(var spec of specs){
			html+=`<a href="product_details.html?lid=${spec.lid}" 
				      class=${spec.lid===product.lid?"active":""}
						 >${spec.spec}</a>`;
		}
		document.querySelector("#show-details .spec>div")
						.innerHTML=html;
		var {lname, os, memory, resolution, video_card, cpu, video_memory, category, disk, details}=product;
		document.querySelector("#param>ul")
			.innerHTML=`<li>
              <a href="javascript:;">商品名称：${lname}</a>
            </li>
            <li>
              <a href="javascript:;">系统：${os}</a>
            </li>
            <li>
              <a href="javascript:;">内存容量：${memory}</a>
            </li>
            <li>
              <a href="javascript:;">分辨率：${resolution}</a>
            </li>
            <li>
              <a href="javascript:;">显卡型号：${video_card}</a>
            </li>
            <li>
              <a href="javascript:;">处理器：${cpu}</a>
            </li>
            <li>
              <a href="javascript:;">显存容量：${video_memory}</a>
            </li>
            <li>
              <a href="javascript:;">分类：${category}</a>
            </li>
            <li>
              <a href="javascript:;">硬盘容量：${disk}</a>
      </li>`;
		document.querySelector("#product-intro")
			.innerHTML=details;

		var html="";
		for(var pic of imgs){
			html+=`<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`;
		}
		var ul=document.querySelector("#icon_list");
		ul.innerHTML=html;
		ul.style.width=62*imgs.length+"px";
		if(imgs.length<=5)
			document.querySelector("#preview>h1>a.forward")
							.className="forward disabled";
		document.querySelector("#mImg").src=imgs[0].md;
		document.querySelector("#largeDiv")
			.style.backgroundImage=`url(${imgs[0].lg})`;
	})
})();
//放大镜功能
(()=>{
	function checkA(){
		if(moved==0)
			aBackward.className="backward disabled";
		else if(ul.children.length-moved==5)
			aForward.className="forward disabled";
		else{
			aBackward.className="backward";
			aForward.className="forward";
		}
	}
	var [aBackward, aForward]=
		document.querySelectorAll("#preview>h1>a");
	var ul=document.getElementById("icon_list");
	var LIWIDTH=62,OFFSET=20,moved=0;
	aForward.onclick=e=>{
		if(e.target.className.indexOf("disabled")==-1)
			move(1);
	}
	aBackward.onclick=e=>{
		if(e.target.className.indexOf("disabled")==-1)
			move(-1);
	}
	function move(dir){
		moved+=dir;
		var left=-LIWIDTH*moved+20;
		ul.style.left=left+"px";
		checkA();
	}
	var mImg=document.getElementById("mImg"),
		  largeDiv=document.getElementById("largeDiv"),
		  mask=document.getElementById("mask"),
			superMask=document.getElementById("superMask");
	ul.onmouseover=e=>{
		if(e.target.nodeName=="IMG"){
			mImg.src=e.target.dataset.md;
			largeDiv.style.backgroundImage=
				`url(${e.target.dataset.lg})`;
		}
	}
	superMask.onmouseover=()=>{
		mask.style.display=largeDiv.style.display="block";
		
	}
	superMask.onmouseout=()=>{
		mask.style.display=largeDiv.style.display="none";
	}
	var MAX=175;
	superMask.onmousemove=e=>{
		var offsetX=e.offsetX, offsetY=e.offsetY;
		var top=offsetY-175/2,
			  left=offsetX-175/2;
		top=top<0?0:top>175?175:top;
		left=left<0?0:left>175?175:left;
		mask.style.top=top+"px";
		mask.style.left=left+"px";
		largeDiv.style.backgroundPosition=
			-left*16/7+"px "+(-top*16/7)+"px";
	}
})()*/
