angular.module('app.onboarding', [])
  .controller('onboardingController', function($scope) {

    $scope.script = 'Please complete Step 1 to access your custom script.';

    $scope.createScript = function() {
      //submit website url to server
      //receive id back from server
      $scope.script = '<script>window.sandpiperid = \"' + providedId + '\"</script>\n<script src = "scriptsource.com"></script>';
    };
  });