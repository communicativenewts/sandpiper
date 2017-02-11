angular.module('app.signup', [])
  .controller('signupController', function($scope, Users) {

    $scope.createUserData = {
      email: $scope.email,
      username: $scope.username,
      password: $scope.password
    }

    $scope.newUser = function(data) {
      Users.createUser({
        email: $scope.email,
        username: $scope.username,
        password: $scope.password
      });
    };
  });