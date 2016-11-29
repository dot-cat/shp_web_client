class Light {
    constructor(_id, _type, _description){
        this.id = _id;
        this.type = _ype;
        this.description = _description;
    }
    
    get DOMelement(){
        var element = document.createElement("div");
        element.setAttribute("class", this.type);
        
        
        
        return element;
    }
}