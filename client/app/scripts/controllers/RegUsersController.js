  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('RegUsersController', function ($scope, $http) {

      //$scope.showUsers = function(){
        $http.get('/api/regusers/').then(function(res, err){
          console.log(res.data);
          $scope.users = res.data;
          if(err){
            console.log(err);
          }
        });
    //}
    });
