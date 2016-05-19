angular.module('Social').service('searchSvc', function($http){
                                                         
    var ip = "http://192.168.0.95:3141";
    var loginToken = JSON.parse(localStorage.getItem('loginToken'));
    
    this.search = (searchInput) => {
        return $http({
            method: "GET",
            url: ip + "/api/users/search/?username=" + searchInput.toString(),
            headers: {
                loginToken: loginToken
            }
        }).then(function(response){
            return response.data;
        })
    };
    
    this.AddFriend = (id) => {
        return $http({
            method: "PUT",
            url: ip + "/api/addfriend/" + id,
            headers: {
                loginToken: loginToken
            }
        }).then(function(response){
            return response.data;
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