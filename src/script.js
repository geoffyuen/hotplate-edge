// Ajax the header/nav into the document
$.get("nav.html", function(data) {
	// console.log(data);
	$("body").prepend(data);
});