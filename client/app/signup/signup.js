angular.module('app.signup', [])
  .controller('signupController', function($scope, $window, $location, Auth, Users) {

    $scope.user = {};

    $scope.signup = function() {
      Auth.createUser($scope.user)
        .then(function(data) { // {user: user, token: token}
          console.log('Signup Data:', data);
          $window.localStorage.setItem('sandpiper.analytics', data.token);
          Users.setUserId(data.user._id);
          $location.path('/onboarding');
        })
        .catch(function(err) {
          console.log('Signup error:', err);
        });
    };

  });