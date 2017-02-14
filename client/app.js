angular.module('sharkanalytics',
  ['app.login',
  'app.signup',
  'app.onboarding',
  'app.dashboard',
  'sharkanalytics.pageView',
  'sharkanalytics.linkClick',
  'sharkanalytics.factory',
  'sharkanalyticss.linkClickPlotly',
  'sharkanalytics.pageViewPlotly',
  'ngRoute'])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'app/signup/signup.html',
      controller: 'signupController'
    })
    .when('/onboarding', {
      templateUrl: 'app/onboarding/onboarding.html',
      controller: 'onboardingController',
      authenticate: true
    })
    .when('/dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'dashboardController',
      authenticate: true
    })
    .when('/overallStats', {
      templateUrl: 'app/overall/overall.html',
      controller: 'linkClickController',
      authenticate: true
    })
    .when('/pageView', {
      templateUrl: 'app/pageview/pageView.html',
      controller: 'pageViewController',
      authenticate: true
    })
    .when('/linkClick', {
      templateUrl: 'app/linkclicks/linkClick.html',
      controller: 'linkClickController',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/login'
    });

  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function($window) {
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('sandpiper.analytics'); // Auth.js
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function(evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});