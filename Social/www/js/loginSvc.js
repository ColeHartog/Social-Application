angular.module('Social').service('loginSvc', function ($http) {

    var ip = "http://192.168.0.95:3141";
    
    this.login = (user) => {
        return $http({
            method: "POST"
            , url: ip + "/api/login"
            , data: user
        }).then(function (response) {
            return response.data;
        })
    };
    
    this.register = (user) => {
        return $http({
            method: "POST"
            , url: ip + "/api/register"
            , data: user
        }).then(function(response){
            return response.data
        })
    };
    
    this.loggedIn = (token) => {
        return $http({
            method: "GET"
            , url: ip + '/api/loggedin',
            headers: {
                loginToken: token
            }
        }).then(function (response) {
            return response.data;
        })
    }

})