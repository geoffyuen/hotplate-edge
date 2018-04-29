function svg_debug(thenode){
	console.log('symbols:');
  	$(thenode).find("symbol").each(function(){
  		console.log("<svg class='' width='" + this.viewBox.baseVal.width + "' height='" + this.viewBox.baseVal.height + "'><use xlink:href='#" + this.id + "'/></svg>");
  		// $("#sprites").append('<svg class="icon"><use xlink:href="#' + this.id + '" /></svg>');
  	});
}

$.get("img/sprites.svg", function(data) {
  $("body").prepend("<div id='svg-inject' style='display: none'>" + new XMLSerializer().serializeToString(data.documentElement) + "</div>")
})
  .success(function(){ svg_debug('#svg-inject') })
;
jQuery(document).ready(function($) {
    console.log('working');
});