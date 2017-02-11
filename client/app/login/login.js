console.log('we are inside the login.js file')

angular.module('app.login', [])
  .controller('loginController', function($scope, Users) {

    $scope.loginUser = function () {
      console.log('$scope.loginUser in loginController')
      Users.loginUser({
        username: $scope.username,
        password: $scope.password
      });
    };

  });