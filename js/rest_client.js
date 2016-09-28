
class ControllableObject {
	constructor(id, actions, initial_status, type, description) {
		this._id = id;
		this._actions = actions;
		this._initial_status = initial_status;
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


function createRoom(_id, _desc) {
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
}

$(document).ready( function () {
	/*
	var data = $.ajax({
		//url: 'http://api.ks-cube.tk/rooms/',
		url: 'http://localhost:10800/rooms/',
		//	crossDomain: true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		async: false,
		dataType: 'json',
		success: function(data){
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(ajaxOptions);
			console.log(thrownError);
		}
	});
	*/
	var request = new XMLHttpRequest();

	if (request.withCredentials !== undefined) {
		request.open('GET', 'http://localhost:10800/rooms/', true);
		//request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//request.setRequestHeader("Connection", "close");
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				console.log("It worked!");
				var response = JSON.parse(request.responseText);
				console.log(response.rooms[1]);
				//console.log(request.responseText.rooms[0]);
			}
		};
		request.send();
	}

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
	console.log(desc);
	container.appendChild(createRoom(id, desc));
});

