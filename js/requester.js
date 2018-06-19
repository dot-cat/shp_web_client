/*-------------------------------------------------------------------------------------*/

var Requester;
Requester = {
    url: 'https://api.ks-cube.tk', // 'http://192.168.1.100:32420',	//	alarmpi.cat/

    roomsURI: '/rooms/',
    objectsURI: '/things/',
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
