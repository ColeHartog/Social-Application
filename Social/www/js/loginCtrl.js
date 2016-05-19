angular.module('Social').controller('loginCtrl', function ($scope, $http, $state, loginSvc) {
    
    setTimeout(function(){
        $scope.hideSpinner = true;
        $scope.$apply();
    }, 1000);
    
    $scope.login = (user) => {
        $scope.loginError = "";
        loginSvc.login(user).then(function(response){
            if (response.login === true) {
                localStorage.setItem('loginToken', JSON.stringify(response.loginToken));
                $state.go('tab.chats', {
                    url: '/chats'
                });
            } else {
                if (response.error) {
                    $scope.loginError = response.error;
                }
            }
        })
    };

    $scope.register = (user) => {
        $scope.loginError = "";
        loginSvc.register(user).then(function (response) {
            if (response.registered) {
                localStorage.setItem('loginToken', JSON.stringify(response.loginToken));
                $state.go('tab.chats', {
                    url: '/chats'
                });
            } else {
                if (response.error) {
                    $scope.loginError = response.error;
                }
            }
        })
    }

})