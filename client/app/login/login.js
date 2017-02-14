angular.module('app.login', [])
  .controller('loginController', function($scope, $window, $location, Auth, Users) {

    $scope.signout = function() {
      console.log('Signing Out.');
      Auth.signout();
    };

    $scope.signout();

    $scope.user = {};

    $scope.signin = function() {
      console.log('Logging In:', $scope.user);
      Auth.loginUser($scope.user)
        .then(function(token) {
          $window.localStorage.setItem('sandpiper.analytics', token);
          $location.path('/dashboard');
        })
        .catch(function(err) {
          console.log('Signin error:', err);
        });
    };

  });