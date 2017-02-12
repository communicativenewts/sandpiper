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
      return response.data;
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
      return response.data;
    });
  };

// *************************************

  return {
    getAllPages: getAllPages,
    getPage: getPage,
    getSiteViews: getSiteViews
  };
})

/* USERS FACTORY */
.factory('Users', function ($http, $location){

  // CACHE USER ID
  var userId = null;
  var userSite = null;

  // RETURN USER ID
  var getUserId = function() {
    console.log('User Id:', userId);
    return userId;
  };

  // SET USER SITE
  var setUserSite = function(site) {
    userSite = site;
  }
  // RETURN USER SITE
  var getUserSite = function() {
    return userSite;
  };

  // RETRIEVE ALL USER SITES
  var getAllSites = function(userId) {
    return $http({
      method: 'GET',
      url: '/api/users/' + userId + '/sites/'
    }).then(function(response) {
      return response.data;
    })
  };

  // REGISTER NEW SITE TO USER
  var addNewSite = function(userId, data) {
    return $http({
      method: 'POST',
      url: '/api/users/' + userId + '/sites/',
      data: data
    }).then(function(response) {
      return response.data;
    })
  };

  // LOGIN USER
  var loginUser = function(data) {
    return $http({
      method: 'POST',
      url: '/api/login/',
      data: {
        username: data.username,
        password: data.password
      }
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
      data: {
        email: data.email,
        username: data.username,
        password: data.password
      }
    }).then(function(resp) {
      console.log('this is resp in factory.js', resp);
      if (resp.data.username) {
        userId = resp.data._id;
        $location.url('/onboarding');
      } else {
        $location.url('/signup');
      }
    })
  };

  return {
    getUserId: getUserId,
    setUserSite: setUserSite,
    getUserSite: getUserSite,
    loginUser: loginUser,
    createUser: createUser,
    getAllSites: getAllSites,
    addNewSite: addNewSite
  }
})