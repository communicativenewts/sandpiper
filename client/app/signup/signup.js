angular.module('app.signup', [])
  .controller('signupController', function($scope, Users) {

    $scope.createUser = function() {
      Users.createUser({
        email: $scope.email,
        username: $scope.username,
        password: $scope.password
      });
    };
  });