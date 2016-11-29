$(document).ready(function(){
    
    
    
    for (i in rooms){
        var room_object = new Room(rooms[i]);
        var room_dom = room_object.DOMelement;
        $(".rooms_box").append(room_dom);
    }
    
    
    
    
    // Состояния панелей управления комнатами
    //  - open - паналь открыта
    //  - close - панель скрыта
    var rooms_control_status = {
        "kitchen": "close",
        "bathroom": "close",
        "bedroom": "close",
        "livingroom": "close",
        "office": "close",
        "corridor": "close"
    };
    
    var info_titles = $(".room_info .info_text");
    for (var i = 0; i < info_titles.length; i++){
        $(info_titles[i]).append("<h3>" + $($($(info_titles[i]).parent()).parent()).attr("name").toLocaleUpperCase() + "</h3>");
    }
    
    // Метод переключения состояния отображения панели 
    // управления комнатами
    // @param _room - название комнаты, статус панели управления
    //                которой стоит переключить
    // @param new_status - новок состояние отображения панели
    // @param cur_status - текущее состояние отображения панели.
    function toggle_control (_room){
        var new_status;
        var cur_status = rooms_control_status[_room];
        var panel = $($(".room_item[name='" + _room + "']").children()[2]);
        
        if (cur_status == "close")
            new_status = "open";
        else if (cur_status == "open")
            new_status = "close";
        rooms_control_status[_room] = new_status;
        panel.removeClass(cur_status);
        panel.addClass(new_status);
    }
    
    // Слушатели событий.
    // Открытие панели управления комнотой.
    $(".open_control").on("click", function(){
        var room_item = $($(this).parent()).parent();
        var room_name = room_item.attr("name");
        var room_obj;
        
        /***********************************************************************/
        for (var i = 0; i < rooms.length; i++ ){
            if (rooms[i].description == room_name){
                for(var j = 0; j < rooms[i].objects.length; j++){
                    
                }
            }
        }
        /***********************************************************************/
        
        toggle_control(room_name);
        console.log(room_name + "\tis " + rooms_control_status[room_name]);
        
    });
    // Закрытие панели управления комнотой.
    $(".close_control").on("click", function(){
        var room_name = $($(this).parent()).parent().attr("name");
        toggle_control(room_name);
        
        console.log(room_name + "\tis " + rooms_control_status[room_name]);
        
    });
    
}); 