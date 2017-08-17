/*
'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', ['$http', '$scope', function ($http, $scope) {

    $scope.submit = function(){
          var loginData = {email: this.email, pass: this.pass};
          console.log(loginData);
          $http.post('/api/login/', JSON.stringify(loginData)).then(function (response) {
            // This function handles success
            console.log('New User created! ' + JSON.stringify(response.data.result));
          }, function (response) {
            // this function handles error
            console.log('Error creating user ' + response);
          });
    };

  }]);
