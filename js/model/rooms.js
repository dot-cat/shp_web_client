class Room {
    constructor(_room){
        this.id = _room.id;
        this.description = _room.description;
        this.objects = _room.objects;
    }
    
    get DOMelement(){
        var room_item = document.createElement("div");
        room_item.setAttribute("class", "room_item");
        room_item.setAttribute("name", this.description);
        room_item.setAttribute("id", this.id);

        var room_image = document.createElement("div");
        var room_info = document.createElement("div");
        var room_control = document.createElement("div");
        room_image.setAttribute("class", "room_image");
        room_image.setAttribute("style", "background-image: url(images/rooms/bg_" + this.description + ".jpg)");
        room_info.setAttribute("class", "room_info");
        room_control.setAttribute("class", "room_control");

        var info_text = document.createElement("div");
        var text_to_info = document.createElement("h3");
        var open_control = document.createElement("div");
        var control_title = document.createElement("div");
        var close_control = document.createElement("div");
        var control_body = document.createElement("div");
        info_text.setAttribute("class", "info_text");
        text_to_info.innerHTML = this.description.toLocaleUpperCase();
        open_control.setAttribute("class", "open_control");
        close_control.setAttribute("class", "close_control");

        room_item.appendChild(room_image);
        room_item.appendChild(room_info);
        room_item.appendChild(room_control);

        room_info.appendChild(info_text);
        room_info.appendChild(open_control);
        info_text.appendChild(text_to_info);
        room_control.appendChild(control_title);
        room_control.appendChild(close_control);
        room_control.appendChild(control_body);
        
        return room_item;
    }
}
