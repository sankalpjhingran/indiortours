'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
    //$urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({enabled: true});

    $stateProvider
        .state('main', {
            url:'/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('about', {
            url:'/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/newuser.html',
            controller: 'LoginCtrl'
        })
        .state('regusers', {
            url: '/regusers',
            templateUrl: 'views/RegUsers.html',
            controller: 'RegUsersController'
        });
}]);
