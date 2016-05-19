angular.module('Social').service('chatRoomSvc', function($http){
    
    var ip = "http://192.168.0.95:3141";
    var loginToken = JSON.parse(localStorage.getItem('loginToken'));
    
    this.getChatRoom = (id) => {
        return $http({
            method: "GET",
            url: ip + "/api/chatroom/" + id,
            headers: {
                loginToken: loginToken
            }
        }).then(function(response){
            return response.data
        })
    };
    
    this.sendMessage = (id, text) => {
        return $http({
            method: "POST",
            url: ip + "/api/chatRoom/newmessage/" + id,
            headers: {
                loginToken: loginToken
            },
            data: {
                text: text
            }
        }).then(function(response){
            return response.data
        })
    };
    
})