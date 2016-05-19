angular.module('Social').controller('searchCtrl', function($scope, searchSvc, user, $ionicHistory){
    
    $scope.user = user.user;
    $ionicHistory.clearCache();
    
    $scope.searchResults = [];
    
    $scope.getNewData = function(){
        searchSvc.loggedIn().then(function(response){
            $scope.user = response.user;
            console.log(user)
        })
    }
    
    $scope.search = function(searchInput){
        if(searchInput){
            searchSvc.search(searchInput).then(function(response){
                $scope.searchResults = response;
            })
        }else{
            $scope.searchResults = [];
        }
        
    };
    
    $scope.addFriend = function(id){
        searchSvc.AddFriend(id).then(function(response){
            $scope.getNewData();
        })
    };
    
    $scope.inRequests  = function(id){
        if($scope.user){
            for(var i = 0; i < $scope.user.requests.length; i++){
                if($scope.user.requests[i]._id === id){
                    return true
                }
            }
        }
        return false
    };
    
    $scope.inRequests  = function(id){
        if($scope.user){
            for(var i = 0; i < $scope.user.friends.length; i++){
                if($scope.user.friends[i]._id === id){
                    return true
                }
            }
        }
        return false
    };
    
    
})