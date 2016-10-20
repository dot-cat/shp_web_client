var path_to_files = "js/";
var files_needed = ["dom_factory.js", "controllable_objects.js", "room.js", "requester.js", "house.js"];

var thisTag = document.currentScript;

function loadJS(filename) {

	var fileref = document.createElement('script')
	fileref.setAttribute("type", "text/javascript")
	fileref.setAttribute("src", path_to_files + filename)

	thisTag.parentNode.insertBefore(fileref, thisTag);
}

for (var i in files_needed) {
	loadJS(files_needed[i]);
}


$(document).ready( function () {

	House.init();
	House.createAllRooms();
});