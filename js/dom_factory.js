var DOMFactory;
DOMFactory = {

    /* Room factory */

    createRoom: function(id, description) {

        var room = document.createElement("div");
        room.setAttribute("class", "accordion_row");

        var ins_elem_id = document.createElement("div");
        ins_elem_id.setAttribute("class", "ins-element-id");
        var header_id = document.createElement("h4");
        header_id.appendChild(document.createTextNode(id));
        ins_elem_id.appendChild(header_id);

        var ins_elem_desc = document.createElement("div");
        ins_elem_desc.setAttribute("class", "ins-element-desc");
        var header_desc = document.createElement("h4");
        var room_desc = document.createTextNode(description);
        header_desc.appendChild(room_desc);
        ins_elem_desc.appendChild(header_desc);

        var clearing_div = document.createElement("div");
        clearing_div.setAttribute("class", "clear");

        room.appendChild(ins_elem_id);
        room.appendChild(ins_elem_desc);
        room.appendChild(clearing_div);

        return room;
    },

    /* End of room factory */
    /*---------------------------------------------------------------------------*/
    /* Object factory and decorators */

    //	Factory for clean html controller (input element)
    createController: function(status) {
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        if (status == "opened" || status == "on") {
            input.checked = true;
        }
        return input;
    },
    //	Decorator for nake controller.
    decorateController: function(controller) {
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
    },

    //	Factory for controller node.
    //	This factory is supposed to be changed for appropriate design.
    createObjectNode: function(controllers, _id, _type, _description) {

        var element = document.createElement("div");
        element.setAttribute("class", "controllable_element"); //	Or "_object" - no difference

        var id = document.createElement("div");
        id.setAttribute("class", "switch_id");
        var idText = document.createTextNode(_id);
        id.appendChild(idText);

        var type = document.createElement("div");
        type.setAttribute("class", "switch_type");
        var typeText = document.createTextNode(_type);
        type.appendChild(typeText);

        var descriptor = document.createElement("div");
        descriptor.setAttribute("class", "switch_desc");
        var descriptorText;
        if (this._description != "")
            descriptorText = document.createTextNode(_description);
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
    },

    //	Creates new div for object.
    createObjectPanel: function(elements) {
        var objects_panel = document.createElement("div");
        objects_panel.setAttribute("class", "room_objects_panel");

        for (i in elements) {
            objects_panel.appendChild(elements[i]);
        }

        return objects_panel;
    }

};