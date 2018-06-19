
/*-------------------------------------------------------------------------------------*/


House = {
    html_container: null,
    room_bindings: new Map(), //	(HTML Node, JS Model)

    //	START! All work starts here.
    init: function () {
        House.html_container = document.getElementById("rooms");
    },

    createAllRooms: function() {
        var data = Requester.getData(Requester.roomsURI);
        for (i in data.rooms) {
            House.createRoom(data.rooms[i]);
        }
    },

    createRoom: function(room) {

        var NewRoom = new Room(room.id, room.description, room.objects);
        var htmlNode = DOMFactory.createRoom(room.id, room.description);

        House.html_container.appendChild(htmlNode);
        House.bindModelWithDOM(htmlNode, NewRoom);

        htmlNode.onclick = function () {
            House.loadRoomObjects(this);
        }
    },

    loadRoomObjects: function(this_room) {

        this_room.classList.toggle("active");

        var room_model = House.room_bindings.get(this_room);

        //	Check if the room is currently viewing
        if (room_model.isActive() === false) {

            //	Check if html nodes have appropriate JS models
            if (!room_model.hasMappedObjects()) {
                House.appendNewObjects(this_room, room_model);
            } else {
                House.updateObjectsByRoom(room_model);
            }

        }

        room_model.toggleActivity();
        this_room.nextSibling.classList.toggle("show");
    },

    appendNewObjects: function(this_room, room_model) {

        var room_obj_ids = room_model._object_ids;
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
            var object_model = new ControllableObject(received_objects[i].id
                , received_objects[i].actions
                , received_objects[i].state
                , received_objects[i].type
                , received_objects[i].description
            );

            //	Step 2: create DOM controller
            var controller = DOMFactory.createController(object_model._status);

            //	Step 3: bind click listener
            controller.onclick = function () {
                House.toggleObject(room_model, this);
            }

            //	Step 4: Bind the input controller to the model of controllable object
            //	(class Room)
            room_model.bindControllerWithModel(controller, object_model);

            //	Step 5: Add design and decorator for main controller (input)
            //	TODO: In future make it possible to have several controllers for one object
            var pretty_controller = DOMFactory.decorateController(controller);

            //	Step 6: TODO: so, put them in the array
            var controllers = [];
            controllers.push(pretty_controller);

            //	Step 7: At last - create the whole html node with id and description views
            var ViewedObject = DOMFactory.createObjectNode(controllers
                , object_model._id
                , object_model._type
                , object_model._description
            );
            objects_nodes.push(ViewedObject);
        }

        //	Step 8: Add objects to the panel
        var objects_panel = DOMFactory.createObjectPanel(objects_nodes);
        this_room.parentNode.insertBefore(objects_panel, this_room.nextSibling);

    },
    updateObjectsByRoom: function(room_model) {
        var object_models = room_model._object_bindings.keys();

        for (let key_val of object_models) {
            //console.log(room_model._object_bindings.get(key_val));
            let model_obj = room_model._object_bindings.get(key_val); // Controllable Object
            let model_id = model_obj._id;
            //console.log(model_id);
            let objectData = Requester.getData(Requester.objectsURI + model_id);
            model_obj.updateStatus(key_val, objectData.status);

        }
    },
    toggleObject: function(room_model, this_object) {
        var model_obj = room_model._object_bindings.get(this_object);
        model_obj.toggleStatus();
        Requester.postCommands(model_obj._id, "toggle");
    },

    bindModelWithDOM: function (htmlNode, roomModel) {
        House.room_bindings.set(htmlNode, roomModel);
    },
};  
