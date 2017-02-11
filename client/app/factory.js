angular.module('sharkanalytics.factory', [])

/* LINKS FACTORY */
.factory('Links', function ($http) {

  //should get all links from database
  var getAllLinks = function () {
    return $http({
      method: 'GET',
      url: '/linkClickAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getLink = function (url) {
    return $http({
      method: 'GET',
      url: '/linkClick',
      params: {url: url}
    })
    .then(function (response) {
      return response;
    });
  };

// *************************************
// *** NEW FUNCTIONS *******************
// *************************************

  var getSiteClicks = function(siteId) {
    return $http({
      method: 'GET',
      url: '/api/sites/' + siteId + '/clicks/'
    }).then(function (response) {
      return response;
    });
  };

// *************************************

  return {
    getAllLinks: getAllLinks,
    getLink: getLink,
    getSiteClicks: getSiteClicks
  };
})


/* PAGES FACTORY */
.factory('Pages', function ($http) {

  //should get all links from database
  var getAllPages = function () {
    return $http({
      method: 'GET',
      url: '/pageViewAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getPage = function (title) {
    return $http({
      method: 'GET',
      url: '/pageView',
      params: {title: title}
    })
    .then(function (response) {
      return response;
    });
  };

// *************************************
// *** NEW FUNCTIONS *******************
// *************************************

  var getSiteViews = function(siteId) {
    return $http({
      method: 'GET',
      url: '/api/sites/' + siteId + '/views/'
    }).then(function (response) {
      return response;
    });
  };

// *************************************

  return {
    getAllPages: getAllPages,
    getPage: getPage,
    getSiteViews: getSiteViews
  };
})

.factory('Users', function ($http){

  var loginUser = function(data) {
    return $http({
      method: 'POST',
      url: '/api/login/',
      params: {
        username: data.username,
        password: data.password
      }
    });
  };

  var createUser = function (data) {
    return $http({
      method: 'POST',
      url: '/api/signup/',
      params: {
        email: data.email,
        username: data.username,
        password: data.password
      }
    });
  };

  return {
    loginUser: loginUser,
    createUser: createUser
  }
})