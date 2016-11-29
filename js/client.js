
class DOMController {

}

class ControllableObject {

	constructor(id, actions, initial_status, type, description) {
		this._id = id;
		this._actions = actions;
		this._status = initial_status;
		this._type = type;
		this._description = description;
		this._next_action;
	}

	updateStatus(html_obj, status) {
		this._status = status;
		this.updateDOMObject(html_obj);
	}
	updateDOMObject(object) {
		if (this._status == "opened" || this._status == "on") { //	FIXME: open or opened ?
			object.checked = true;
		} else {
			object.checked = false;
		}
	}

	toggleStatus() {
		if (this._type == "door") {
			if (this._status == "opened") {
				this._status = "closed";
			} else {
				this._status = "opened";
			}
		} else if (this._type == "lighting" || this._type == "fan") {
			if (this._status == "on") {
				this._status = "off";
			} else {
				this._status = "on";
			}
		}
	}

	decorateDOMController(controller) {
		//	TODO: find out how to decorate according to actions
		//	TODO: Still default decorator
		var container = document.createElement("div");
		container.setAttribute("class", "the_switch");

		var label = document.createElement("label");
		label.setAttribute("class", "switch");

		var slider = document.createElement("div");
		slider.setAttribute("class", "slider");

		label.appendChild(controller);
		label.appendChild(slider);
		container.appendChild(label);
		return container;
	}

	createDOMController() {
		var input = document.createElement("input");
		input.setAttribute("type", "checkbox");
		//	FIXME: Look down at "TODO" in class Sunlind
		if (this._status == "opened" || this._status == "on") { //	FIXME: open or opened ?
			input.checked = true;
		}
		return input;
	}

	createObjectDOMNode(controllers) {

		var element = document.createElement("div");
		element.setAttribute("class", "controllable_element"); //	Or "_object" - no difference

		var id = document.createElement("div");
		id.setAttribute("class", "switch_id");
		var idText = document.createTextNode(this._id);
		id.appendChild(idText);

		var type = document.createElement("div");
		type.setAttribute("class", "switch_type");
		var typeText = document.createTextNode(this._type);
		type.appendChild(typeText);

		var descriptor = document.createElement("div");
		descriptor.setAttribute("class", "switch_desc");
		var descriptorText;
		if (this._description != "")
			descriptorText = document.createTextNode(this._description);
		else
			descriptorText = document.createTextNode("-");
		descriptor.appendChild(descriptorText);

		var clearing_div = document.createElement("div");
		clearing_div.setAttribute("class", "clear");

		element.appendChild(id);
		element.appendChild(type);
		element.appendChild(descriptor);
		for (i in controllers) {
			element.appendChild(controllers[i]);
		}
		element.appendChild(clearing_div);

		return element;
	}

	static createObjectPanel(elements) {
		var objects_panel = document.createElement("div");
		objects_panel.setAttribute("class", "room_objects_panel");

		for (i in elements) {
			objects_panel.appendChild(elements[i]);
		}

		return objects_panel;
	}
}

class Sunblind extends ControllableObject {
	//	TODO: for Sunblind implement its own createObjectDOMNode()
	// 	TODO: for Sunblind implement its own createDOMController()
}

class Lighter extends ControllableObject {
	//	TODO: for Lighter implement its own createObjectDOMNode()
	// 	TODO: for Lighter implement its own createDOMController()
}

class Door extends ControllableObject {

}

var AbstractFactory = {
	createObject: function(type) {
		//	TODO: creating dom elements acccording to the type of the fetched objects (Sunblind, Door etc).
	}
}

class Room {

	constructor(id, description, object_ids) {

		this._id = id;
		this._description = description;
		this._object_ids = object_ids;
		this._active = Boolean(false);
		//this._controllable_objects = new Set();
		this._object_bindings = new Map();
	}

	isActive() {
		return this._active;
	}
	hasMappedObjects() {
		return this._object_bindings.size != 0;
	}
	toggleActivity() {
		if (this._active === false)
			this._active = Boolean(true);
		else
			this._active = Boolean(false);
	}

	bindControllerWithModel(controller, model) {
		this._object_bindings.set(controller, model);
	}

	createRoomDOMNode() {

		var row = document.createElement("div");
		row.setAttribute("class", "accordion_row");

		var ins_elem_id = document.createElement("div");
		ins_elem_id.setAttribute("class", "ins-element-id");
		var header_id = document.createElement("h4");
		header_id.appendChild(document.createTextNode(this._id));
		ins_elem_id.appendChild(header_id);

		var ins_elem_desc = document.createElement("div");
		ins_elem_desc.setAttribute("class", "ins-element-desc");
		var header_desc = document.createElement("h4");
		var room_desc = document.createTextNode(this._description);
		header_desc.appendChild(room_desc);
		ins_elem_desc.appendChild(header_desc);

		var clearing_div = document.createElement("div");
		clearing_div.setAttribute("class", "clear");

		row.appendChild(ins_elem_id);
		row.appendChild(ins_elem_desc);
		row.appendChild(clearing_div);

		return row;
	}
}

/*-------------------------------------------------------------------------------------*/

var Requester;
Requester = {
	url: 'http://localhost:10800',

	roomsURI: '/rooms/',
	objectsURI: '/objects/',
	messagesURI: '/messages/',

	request: new XMLHttpRequest(),

	getData: function(getting_type) {
		request = Requester.request;
		if (request !== undefined) {
			request.open('GET',  Requester.url + getting_type, false);
			request.onreadystatechange = function () {
				if (request.readyState == 4) {
					if (request.status == 200) {
						//console.log("It worked!");
					}
					else {
						console.log(request.status + ": " + request.statusText);
					}
				}
			};
			request.send(null);
			return JSON.parse(request.responseText);
		}
	},
	postCommands: function(id, action) {
		request = Requester.request;
		let data = {
			"type": "user_request",
			"source": "web",
			"event": "action_requested",
			"body": {
				"action": action,
				"obj_id": id,
				"action_params": {}
			}
		};
		if (request !== undefined) {

			request.open('POST',  Requester.url + Requester.messagesURI, false);
			request.setRequestHeader("Content-Type", "application/json");
			request.onreadystatechange = function () {
				if (request.readyState == 4) {
					if (request.status == 200) {
						//console.log("It worked!");
					}
					else {
						console.log(request.status + ": " + request.statusText);
					}
				}
			};
			request.send(JSON.stringify(data));
			return JSON.parse(request.responseText);
		}
	}
};

/*-------------------------------------------------------------------------------------*/

var House;
House = {
	html_container: null,
	room_bindings: new Map(), //	(HTML Node, JS Model)

	init: function () {
		
		House.html_container = document.getElementById("rooms");

		var data = Requester.getData(Requester.roomsURI);
		for (i in data.rooms) {
			var NewRoom = House.createRoomModel(data.rooms[i].id, data.rooms[i].description, data.rooms[i].objects);

			var htmlNode = NewRoom.createRoomDOMNode();
			House.html_container.appendChild(htmlNode);
			House.bindModelWithDOM(htmlNode, NewRoom);

			htmlNode.onclick = function () { // TODO: Create separated handler

				this.classList.toggle("active");
				var room_model = House.room_bindings.get(this);

				//	Check if the room is currently viewing
				if (room_model.isActive() === false) {
					var room_obj_ids = room_model._object_ids;
					if (!room_model.hasMappedObjects()) {

						var received_objects = [];
						//	Getting the data from server successively
						for (i in room_obj_ids) {
							var objectData = Requester.getData(Requester.objectsURI + room_obj_ids[i]);
							received_objects.push(objectData);
						}
						var objects_nodes = [];
						//	Create all mappings
						for (i in received_objects) {
							//	Step 1: Create Objects Model.
							var NewObjectModel = new ControllableObject(received_objects[i].id
								, received_objects[i].actions
								, received_objects[i].status
								, received_objects[i].type
								, received_objects[i].description
							);
							//	Step 2: create DOM controller
							//	TODO: in future create array for controller of possible types of actions on the object
							var controller = NewObjectModel.createDOMController();
							//	Step 3: assign handler for "onclick" event

							// TODO: Create separated handler
							controller.onclick = function () {
								//	TODO: implement!
								//	...
								let model_obj = room_model._object_bindings.get(this);
								//if (this.checked == true) {
								//		if (model_obj.)
								//		}
								model_obj.toggleStatus();
								//console.log(model_obj._status);
								Requester.postCommands(model_obj._id, "toggle");
							}
							//	Step 4: Bind the input controller to the model of controllable object
							room_model.bindControllerWithModel(controller, NewObjectModel);

							//	Step 5: Add design and decorator for main controller (input)
							//	TODO: In future make it possible to have several controllers for one object
							var pretty_controller = NewObjectModel.decorateDOMController(controller);
							//	Step 6: TODO: so, put them in the array
							var controllers = [];
							controllers.push(pretty_controller);
							//	Step 7: At last - create the whole html node with id and description views
							objects_nodes.push(NewObjectModel.createObjectDOMNode(controllers));
						}
						//	Step 8: Add objects to the panel
						var objects_panel = ControllableObject.createObjectPanel(objects_nodes);
						this.parentNode.insertBefore(objects_panel, this.nextSibling);

					} else {
						//	TODO: Update models and DOM elements
						var object_models = room_model._object_bindings.keys();

						for (let key_val of object_models) {
							//console.log(room_model._object_bindings.get(key_val));
							let model_obj = room_model._object_bindings.get(key_val); // Controllable Object
							let model_id = model_obj._id;
							//console.log(model_id);
							let objectData = Requester.getData(Requester.objectsURI + model_id);
							model_obj.updateStatus(key_val, objectData.status);

						}
						//console.log(object_models);
					}
				}
				room_model.toggleActivity();
				this.nextSibling.classList.toggle("show");
			} //	htmlNode.onclick()

		}
	},
	createRoomModel: function (id, desc, object_ids) {
		return new Room(id, desc, object_ids);
	},
	bindModelWithDOM: function (htmlNode, roomModel) {
		House.room_bindings.set(htmlNode, roomModel);
	}
};

function testDesign() {
	var acc = document.getElementsByClassName("accordion_row");
	var i;
	for (i = 0; i < acc.length; i++) {
		acc[i].index = i;
		acc[i].onclick = function() {
			this.classList.toggle("active");
			document.getElementsByClassName("room_objects_panel")[this.index].classList.toggle("show");
		}
	}
}

$(document).ready( function () {
	House.init();
	//testDesign();
});