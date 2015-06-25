function svg_debug(thenode){
	console.log('symbols:');
  	$(thenode).find("symbol").each(function(){
  		console.log(this.id);
  		$("#sprites").append('<svg class="icon"><use xlink:href="#' + this.id + '" /></svg>');
  	});
}

$.get("img/sprites.svg", function(data) {
  $("body").append("<div id='svg-inject' style='display: none'>" + new XMLSerializer().serializeToString(data.documentElement) + "</div>")
})
  .success(function(){ svg_debug('#svg-inject') })
;