'use strict';

angular.module('app')
  .factory('customersResource', ['$resource', function($resource) {
    return $resource('https://holidayapi.com/v1/holidays?key=12ed68aa-eebb-4c0b-a37b-6d3202de35ef&country=US&year=2017&month=5', {day: '@id'})
  }]);
