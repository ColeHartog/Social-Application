angular.module('Social').controller('settingsCtrl', function($scope, user, $ionicHistory, $ionicPopup, settingsSvc){
    
    $scope.user = user.user;
    console.log($scope.user)
    $ionicHistory.clearCache();
    
    $scope.colorPicker = $scope.user.color;
    $scope.newUrl = {url: ""};
    
    
    $scope.getNewData = () => {
        settingsSvc.loggedIn().then(function(response){
            $scope.user = response.user;
            console.log($scope.user);
        })
    };
    
    $scope.showColorPopup = () => {
        var colorPopup = $ionicPopup.show({
            templateUrl: "/templates/colorPickerTmpl.html",
            title: 'Choose A Color',
            subTitle: "for your chats background color",
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(){
                        settingsSvc.updateColor($scope.colorPicker).then(function(response){
                            $scope.getNewData();
                        })
                    }
                }
            ]
        })
    };
    
    $scope.showProfileImgPopup = () => {
        var imagePopup = $ionicPopup.show({
            templateUrl: 'templates/newImgTmpl.html',
            title: "Change Profile Image",
            subTitle: "enter in a new image url",
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(){
                        console.log("hit");
                        settingsSvc.updateImg($scope.newUrl.url).then(function(response){
                            $scope.getNewData();
                        })
                    }
                }
            ]
        })
    };
    
    
})