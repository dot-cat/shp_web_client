
class ControllableObject {
	constructor(id, actions, initial_status, type, description) {
		this._id = id;
		this._actions = actions;
		this._status = initial_status;
		this._type = type;
		this._description = description;
	}
}

class Sunblind extends ControllableObject {
	
}

class Room {
	constructor(id, description) {
		this._id = id;
		this._description = description;
		this._objects = new Map();
	}
	checkIfHas(object) {
		return this._objects.has(object);
	}
	addObject(id, object) {
		this._objects.set(object);
	}
}

/*-------------------------------------------------------------------------------------*/

var Requester = {
	request: new XMLHttpRequest(),
	url: 'http://localhost:10800',
	getData: function(getting_type) {
		request = Requester.request;
		if (request !== undefined) {
			request.open('GET',  Requester.url + getting_type, true);
			request.onreadystatechange = function () {
				if (request.readyState == 4) {
					if (request.status == 200) {
						console.log("It worked!");
						return JSON.parse(request.responseText);
					}
					else {
						console.log(request.status + ": " + request.statusText);
					}
				}
			};
			request.send(null);
		}
	}
};

/*-------------------------------------------------------------------------------------*/

var House = {
	html_container: document.getElementById("rooms"),
	room_bindings: new Map(),

	init: function() {
		var data = Requester.getData('/rooms/');
		
	},
	createRoomDOMNode: function(_id, _desc) {
		var row = document.createElement("div");
		row.setAttribute("class", "accordion_row");

		var ins_elem_id = document.createElement("div");
		ins_elem_id.setAttribute("class", "ins-element-id");
		var header_id = document.createElement("h4");
		header_id.appendChild(document.createTextNode(_id));
		ins_elem_id.appendChild(header_id);

		var ins_elem_desc = document.createElement("div");
		ins_elem_desc.setAttribute("class", "ins-element-desc");
		var header_desc = document.createElement("h4");
		var room_desc = document.createTextNode(_desc);
		header_desc.appendChild(room_desc);
		ins_elem_desc.appendChild(header_desc);

		var clearing_div = document.createElement("div");
		clearing_div.setAttribute("class", "clear");

		row.appendChild(ins_elem_id);
		row.appendChild(ins_elem_desc);
		row.appendChild(clearing_div);

		row.onclick = function() {
			this.classList.toggle("active");
			this.getElementsByClassName("room_objects_panel")[0].classList.toggle("show");
		}
		return row;
	},
	createRoomModel: function(id, desc) {
		return new Room(id, desc);
	},
	bindModelWithDOM: function(htmlRow, roomModel) {
		House.room_bindings.set(htmlRow, roomModel);
	}
};



$(document).ready( function () {

	House.init();

	var acc = document.getElementsByClassName("accordion_row");
	var i;
	for (i = 0; i < acc.length; i++) {
		acc[i].onclick = function(){
			this.classList.toggle("active");
			this.getElementsByClassName("room_objects_panel")[0].classList.toggle("show");
		}
	}

	/* testing */
	var container = document.getElementById("rooms");
	var id = "R6";
	var desc = String("Room for experiments");
	container.appendChild(House.createRoomDOMNode(id, desc));
});

