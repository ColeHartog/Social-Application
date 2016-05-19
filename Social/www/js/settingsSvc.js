angular.module('Social').service('settingsSvc', function($http){
    
    var ip = "http://192.168.0.95:3141";
    var loginToken = JSON.parse(localStorage.getItem('loginToken'));
    
    this.loggedIn = (token) => {
        return $http({
            method: "GET"
            , url: ip + '/api/loggedin',
            headers: {
                loginToken: loginToken
            }
        }).then(function (response) {
            return response.data;
        })
    };
    
    this.updateColor = (color) => {
        return $http({
            method: "PUT"
            , url: ip + '/api/user/updatecolor',
            headers: {
                loginToken: loginToken
            },
            data: {
                color: color
            }
        }).then(function (response) {
            return response.data;
        })
    };
    
    this.updateImg = (url) => {
        return $http({
            method: "PUT"
            , url: ip + '/api/user/updateprofileimg',
            headers: {
                loginToken: loginToken
            },
            data: {
                url: url
            }
        }).then(function (response) {
            return response.data;
        })
    };
    
})