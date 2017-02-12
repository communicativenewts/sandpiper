angular.module('app.signup', [])
  .controller('signupController', function($scope, $window, $location, Auth, Users) {

    $scope.user = {};

    $scope.signup = function() {
      Auth.createUser($scope.user)
        .then(function(token) {
          $window.localStorage.setItem('sandpiper.analytics', token);
          $location.path('/onboarding');
        })
        .catch(function(err) {
          console.log('Signup error:', err);
        });
    };

  });