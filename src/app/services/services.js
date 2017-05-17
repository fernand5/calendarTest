'use strict';

var holydayService = function ($http,$q) {
  var getHolidaysPerDay = function (countryCode,year,month,day) {
    return $http({
      method : "GET",
      url : "https://holidayapi.com/v1/holidays?key=12ed68aa-eebb-4c0b-a37b-6d3202de35ef&country="+countryCode+"&year="+year+"&month="+month+"&day="+day,

    }).then(function mySucces(response) {
      return response;
    }, function myError(response) {

      return response.statusText;

    })
  };
  var getHolidaysPerMonth = function (countryCode,year,month) {
    return $http({
      method : "GET",
      url : "https://holidayapi.com/v1/holidays?key=12ed68aa-eebb-4c0b-a37b-6d3202de35ef&country="+countryCode+"&year="+year+"&month="+month,

    }).then(function mySucces(response) {
      return response;
    }, function myError(response) {
      return response.statusText;

    })
  };
  var getHolidaysPerYear = function (countryCode,year) {
    return $http({
      method : "GET",
      url : "https://holidayapi.com/v1/holidays?key=12ed68aa-eebb-4c0b-a37b-6d3202de35ef&country="+countryCode+"&year="+year,

    }).then(function mySucces(response) {
      if (typeof response.data === 'object') {
        return response.data;
      } else {
        // invalid response
        return $q.reject(response.data);
      }
    }, function(response) {
      // something went wrong
      return $q.reject(response.data);
    });
  };

  return {
    getHolidaysPerDay: getHolidaysPerDay,
    getHolidaysPerMonth: getHolidaysPerMonth,
    getHolidaysPerYear: getHolidaysPerYear
  }
}
angular
  .module("app")
  .factory("holydayService", holydayService);
