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


    toggleStatus() {
        if (this._type == "slider") {
            if (this._status == "opened") {
                this._status = "closed";
            } else {
                this._status = "opened";
            }
        } else if (this._type == "switch") {
            if (this._status == "on") {
                this._status = "off";
            } else {
                this._status = "on";
            }
        }
    }

    /* DOM Elements */

    updateDOMObject(object) {
        if (this._status == "opened" || this._status == "on") {
            object.checked = true;
        } else {
            object.checked = false;
        }
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
