
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
}