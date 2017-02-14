angular.module('sharkanalytics.factory', [])

// LINK CLICKS FACTORY
.factory('Links', function ($http) {

  var getSiteClicks = function(siteId) {
    return $http({
      method: 'GET',
      url: '/api/sites/' + siteId + '/clicks/'
    }).then(function (response) {
      return response.data;
    });
  };

  var getClick = function(clickId) {
    return $http({
      method: 'GET',
      url: '/api/clicks/' + clickId
    }).then(function (response) {
      return response.data;
    });
  };

  return {
    getSiteClicks: getSiteClicks,
    getClick: getClick
  };
})

// PAGE VIEWS FACTORY
.factory('Pages', function ($http) {

  var getSiteViews = function(siteId) {
    return $http({
      method: 'GET',
      url: '/api/sites/' + siteId + '/views/'
    }).then(function (response) {
      return response.data;
    });
  };

  var getView = function(viewId) {
    return $http({
      method: 'GET',
      url: '/api/views/' + viewId
    }).then(function (response) {
      return response.data;
    });
  };

  return {
    getSiteViews: getSiteViews,
    getView: getView
  };
})

// USERS FACTORY
.factory('Users', function ($http, $location){

  // CACHE USER ID
  var userId = null;
  var userSite = null;

  // RETURN USER ID
  var getUserId = function() {
    return userId;
  };

  // SET USER SITE
  var setUserSite = function(site) {
    userSite = site;
  };

  // RETURN USER SITE
  var getUserSite = function() {
    return userSite._id;
  };

  // RETRIEVE ALL USER SITES
  var getAllSites = function(userId) {
    return $http({
      method: 'GET',
      url: '/api/users/' + userId + '/sites/'
    }).then(function(response) {
      return response.data;
    });
  };

  // REGISTER NEW SITE TO USER
  var addNewSite = function(userId, data) {
    return $http({
      method: 'POST',
      url: '/api/users/' + userId + '/sites/',
      data: data
    }).then(function(response) {
      return response.data;
    });
  };

  // LOGIN USER
  var loginUser = function(data) {
    return $http({
      method: 'POST',
      url: '/api/login/',
      data: data
    }).then(function(resp) {
      if (resp.data.username) {
        userId = resp.data._id;
        $location.url('/dashboard');
      } else {
        $location.url('/login');
      }
    });
  };

  // CREATE NEW USER
  var createUser = function (data) {
    return $http({
      method: 'POST',
      url: '/api/signup/',
      data: data
    }).then(function(resp) {
      if (resp.data.username) {
        userId = resp.data._id;
        $location.url('/onboarding');
      } else {
        $location.url('/signup');
      }
    });
  };

  return {
    getUserId: getUserId,
    setUserSite: setUserSite,
    getUserSite: getUserSite,
    loginUser: loginUser,
    createUser: createUser,
    getAllSites: getAllSites,
    addNewSite: addNewSite
  };

});