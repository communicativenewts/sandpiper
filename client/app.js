angular.module('sharkanalytics',
  ['app.authorization',
  'app.onboarding',
  'app.dashboard',
  'sharkanalytics.pageView',
  'sharkanalytics.linkClick',
  //'sharkanalytics.factory',
  'sharkanalyticss.linkClickPlotly',
  'sharkanalytics.pageViewPlotly',
  'ngRoute'])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/authorization', {
      templateUrl: 'app/authorization/authorization.html',
      controller: 'authorizationController'
    })
    .when('/onboarding', {
      templateUrl: 'app/onboarding/onboarding.html',
      controller: 'onboardingController'
    })
    .when('/dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'dashboardController'
    })
    .when('/pageView', {
      templateUrl: 'app/pageview/pageView.html',
      controller: 'pageViewController'
    })
    .when('/linkClick', {
      templateUrl: 'app/linkclicks/linkClick.html',
      controller: 'linkClickController'
    })
    .when('/overall', {
      templateUrl: 'app/overall/overall.html',
      controller: 'linkClickVisualsController'
    })
    .otherwise({
      redirectTo: '/'
    })
  })
