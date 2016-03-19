function svg_debug(thenode){
	console.log('symbols:');
  	$(thenode).find("symbol").each(function(){
  		console.log("<syg class='icon'><use xlink:href='#" + this.id + "'/></svg>");
  		// $("#sprites").append('<svg class="icon"><use xlink:href="#' + this.id + '" /></svg>');
  	});
}

$.get("img/sprites.svg", function(data) {
  $("body").prepend("<div id='svg-inject' style='display: none'>" + new XMLSerializer().serializeToString(data.documentElement) + "</div>")
})
  .success(function(){ svg_debug('#svg-inject') })
;
// Ajax the header/nav into the document
$.get("nav.html", function(data) {
	// console.log(data);
	$("body").prepend(data);
});