angular.module("Social").controller('chatRoomCtrl', function($scope, user, $ionicHistory, chatRoomSvc, chatRoom, $stateParams){
    
    $scope.user = user.user;
    $scope.chatRoom = chatRoom.chatRoom;
    $scope.newMessage = {};
    $ionicHistory.clearCache();
    
    $scope.getNewData = () => {
        chatRoomSvc.getChatRoom($stateParams.chatId).then(function(response){
            $scope.chatRoom = response.chatRoom;
        })
    };
    
    $scope.sendMessage = (text) => {
        chatRoomSvc.sendMessage($scope.chatRoom._id, text).then(function(response){
            $scope.newMessage = {};
            $scope.getNewData();
        })
    };
    
    setInterval(function(){
        $scope.getNewData();
    }, 1000);
    
})