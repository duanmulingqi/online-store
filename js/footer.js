//在当前页面加载footer.html
(()=>{
	ajax({type:"get",url:"footer.html"})
		.then(html=>{
		document.getElementById("footer").innerHTML=html;
	})
})();