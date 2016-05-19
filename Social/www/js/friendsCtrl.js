angular.module('Social').controller("friendsCtrl", function($scope, user, $ionicHistory){
    
    $scope.user = user.user;
    console.log($scope.user);
    
    $ionicHistory.clearCache();
    
})