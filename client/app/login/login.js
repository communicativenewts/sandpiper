angular.module('app.login', [])
  .controller('loginController', function($scope, $window, $location, Auth, Users) {

    $scope.user = {};

    $scope.signin = function() {
      Auth.loginUser($scope.user)
        .then(function(token) {
          $window.localStorage.setItem('sandpiper.analytics', token);
          $location.path('/dashboard')
        })
        .catch(function(err) {
          console.log('Signin error:', err);
        });
    };

  });