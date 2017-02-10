angular.module('app.onboarding', [])
  .controller('onboardingController', function($scope) {
    $scope.value = '(onboarding instructions here)';
    $scope.sites = [
      {
        id: 1,
        url: 'www.amazon.com',
        title: 'My Amazon Marketplace'
      },
      {
        id: 2,
        url: 'www.blog.com',
        title: 'My Blog'
      },
      {
        id: 3,
        url: 'www.business.com',
        title: 'My Business\'s Website'
      }
    ];
  });