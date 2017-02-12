angular.module('app.onboarding', [])
  .controller('onboardingController', function($scope, Users, $location) {

    $scope.userId = Users.getUserId();
    $scope.newSite = {
      url: null,
      title: ''
    };

    $scope.validURL = null;
    $scope.validTitle = null;
    $scope.siteId = null;

    $scope.checkSite = function() {

      //check for valid title
      if ($scope.newSite.title.length > 0) {
        console.log('valid title');
        $scope.validTitle = 'Valid Title';
        $('#title-input').removeClass('has-error').addClass('has-success');
      } else {
        console.log('invalid title');
        $scope.validTitle = 'Please Add Title';
        $('#title-input').removeClass('has-success').addClass('has-error');
      };

      $('#title-valid').show();

      var regEx = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.([-a-zA-Z0-9@:%._\+~#=]{2,256}\.)*[a-z]{2,6}$/;

      if (regEx.test($scope.newSite.url)) {
        console.log('valid site');
        $scope.validURL = 'Valid Site URL';
        $('#site-input').removeClass('has-error').addClass('has-success');
      } else {
        console.log('invalid site');
        $scope.validURL = 'Invalid Site URL';
        $('#site-input').removeClass('has-success').addClass('has-error');
      }

      $('#url-valid').show();

      if ($scope.validTitle === 'Valid Title' && $scope.validURL === 'Valid Site URL'){
        createScript();
      }
    };

    $scope.script = 'Please complete Step 1 to access your custom script.';

    var createScript = function() {
      console.log('createScript triggered');
      Users.addNewSite(Users.getUserId(), $scope.newSite)
      .then(function(siteId) {
        console.log('new site id is', siteId)
        $scope.siteId = siteId._id;
        $scope.script = '<script>window.sandpiperid=\"' + $scope.siteId + '\"</script>\n<script src="scriptsource.com"></script>';
      });
    };

    $scope.startTracking = function() {
      Users.setUserSite($scope.siteId);
      $location.path('/dashboard');
    }

  });