class Controllable {
    constructor (_id, _type, _description) {
        this.id          = _id;
        this._type       = _type;
        this.description = _description;
    }
    constructor (_obj) {
        this.id          = _obj.id;
        this._type       = _obj.type;
        this.description = _obj.description;
    }
    
    get controllableDOM () {
        var controllableObj = document.createElement("div");
        controllableObj.setAttribute("class", "controllable");
        controllableObj.setAttribute("class", this.type);
        
        console.log(controllableObj);
        return controllableObj;
    }
}