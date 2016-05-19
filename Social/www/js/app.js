angular.module('Social', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
    $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })
  
  .state('login', {
      url: '/login',
      templateUrl: 'templates/loginTmpl.html',
      controller: 'loginCtrl',
      resolve: {
          loginToken: function(loginSvc, $state){
              if(localStorage.getItem('loginToken')){
                 setTimeout(function(){
                     loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken'))).then(function(response){
                      if(response.loggedIn){
                          $state.go('tab.chats', {url: '/url'});
                      }else{
                          return null;
                      }
                  });
                 }, 500); 
              }else{
                  return null
              }
          }
      } 
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'searchCtrl',
          resolve: {
          loginToken: function(loginSvc, $state){
              if(localStorage.getItem('loginToken')){
                     loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken'))).then(function(response){
                      if(response.loggedIn){
                          return null;
                      }else{
                          $state.go('login');
                      }
                  });
              }else{
                  $state.go('login');
              }
          },
              user: function(loginSvc){
                  if(localStorage.getItem('loginToken')){
                      return loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken')));
                  }else{
                      return null;
                  }
              }
        }
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'friendsCtrl',
            resolve: {
              loginToken: function(loginSvc, $state){
                  if(localStorage.getItem('loginToken')){
                         loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken'))).then(function(response){
                          if(response.loggedIn){
                              return response.user;
                          }else{
                              $state.go('login');
                          }
                      });
                  }else{
                      $state.go('login');
                  }
              },
                user: function(loginSvc){
                  if(localStorage.getItem('loginToken')){
                      return loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken')));
                  }else{
                      return null;
                  }
              }
            }
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'chatRoomCtrl',
            resolve: {
              loginToken: function(loginSvc, $state){
                  if(localStorage.getItem('loginToken')){
                         loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken'))).then(function(response){
                          if(response.loggedIn){
                              return response.user;
                          }else{
                              $state.go('login');
                          }
                      });
                  }else{
                      $state.go('login');
                  }
              },
                user: function(loginSvc){
                  if(localStorage.getItem('loginToken')){
                      return loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken')));
                  }else{
                      return null;
                  }
              },
                chatRoom: function(chatRoomSvc, $stateParams){
                    return chatRoomSvc.getChatRoom($stateParams.chatId);
                }
            }
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'settingsCtrl',
          resolve: {
              loginToken: function(loginSvc, $state){
                  if(localStorage.getItem('loginToken')){
                         loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken'))).then(function(response){
                          if(response.loggedIn){
                              return null;
                          }else{
                              $state.go('login');
                          }
                      });
                  }else{
                      $state.go('login');
                  }
              },
              user: function(loginSvc){
                  if(localStorage.getItem('loginToken')){
                      return loginSvc.loggedIn(JSON.parse(localStorage.getItem('loginToken')));
                  }else{
                      return null;
                  }
              }
            }
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

});
