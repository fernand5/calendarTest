angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: HelloController
  });
/** @ngInject */
function HelloController($http, $compile, holydayService, $scope, $q, $resource) {

  var vm = this;
  vm.array = [];
  vm.tmpMonth = [];
  console.log(vm.array);
  vm.showCalendar = false;
  vm.dateFrom = new Date();
  vm.holidays = null;

  vm.quantityDays = 0;
  vm.countryCode = 'US';
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  vm.process = function () {
    var originalDate = new Date(vm.dateFrom);
    console.log(vm.dateFrom.getDate());
    vm.array = [];
    vm.tmpMonth = [];
    vm.tmpDays = [];
    vm.tmpMonth['title'] = monthNames[originalDate.getMonth()];
    vm.tmpMonth['numberMonth'] = originalDate.getMonth();
    vm.tmpMonth['numberYear'] = originalDate.getFullYear();
    vm.tmpDays = [];


    if (originalDate.getDay() != 0) {
      for (j = 0; j < originalDate.getDay(); j++) {
        vm.tmpDays.push({'class': 'invalid-days', 'number': '0'});
      }
    }

    var User = $resource('https://holidayapi.com/v1/holidays');

    var promise=User.get({
      year: originalDate.getFullYear(),
      country: vm.countryCode,
      key: '12ed68aa-eebb-4c0b-a37b-6d3202de35ef'
    }).$promise.then(
      function (data) {
        return data;
      },
      function (reason) {
        return reason;
      });

    vm.holidays=promise.then(function(response) {

      vm.holidays=response.holidays;



    for (i = 1; i <= vm.quantityDays; i++) {

      var month=(originalDate.getMonth()+1);
      // if(month)


      var dateToSearch=originalDate.getFullYear()+'-'+("0" + (originalDate.getMonth() + 1)).slice(-2)+'-'+("0" + originalDate.getDate()).slice(-2);
      console.log(dateToSearch);
      // console.log(vm.holidays[dateToSearch]);




      if ((new Date(originalDate.getFullYear(), originalDate.getMonth() + 1, 0).getDate()) == (originalDate.getDate())) {
        if(vm.holidays.hasOwnProperty(dateToSearch)) {
          vm.tmpDays.push({
            'class': 'holiday',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        }
        else if (vm.dateFrom.getDay() == 0) {
          vm.tmpDays.push({
            'class': 'weekend',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        }
        else if (originalDate.getDay() == 6) {
          vm.tmpDays.push({
            'class': 'weekend',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        } else {
          vm.tmpDays.push({
            'class': 'weekday',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        }
        if (originalDate.getDay() <= 6) {
          for (j = originalDate.getDay(); j < 6; j++) {
            vm.tmpDays.push({'class': 'invalid-days', 'number': '0'});
          }
        }
        vm.tmpMonth['days'] = vm.tmpDays;

        vm.array.push(vm.tmpMonth);
        vm.tmpMonth = [];

        vm.tmpDays = [];
        if (originalDate.getDay() >= 0) {
          for (j = 0; j < originalDate.getDay() + 1; j++) {
            vm.tmpDays.push({'class': 'invalid-days', 'number': '0'});
          }
        }
        if (originalDate.getMonth() == 11) {
          vm.tmpMonth['title'] = monthNames[0];
          vm.tmpMonth['numberMonth'] = originalDate.getMonth();
        } else {
          vm.tmpMonth['title'] = monthNames[originalDate.getMonth() + 1];
          vm.tmpMonth['numberMonth'] = originalDate.getMonth() + 1;

        }

        vm.tmpMonth['numberYear'] = originalDate.getFullYear();

      } else {
        if(vm.holidays.hasOwnProperty(dateToSearch)) {
          vm.tmpDays.push({
            'class': 'holiday',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        }
        else if (originalDate.getDay() == 0) {
          vm.tmpDays.push({
            'class': 'weekend',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        }
        else if (originalDate.getDay() == 6) {
          vm.tmpDays.push({
            'class': 'weekend',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        } else {
          vm.tmpDays.push({
            'class': 'weekday',
            'number': originalDate.getDate(),
            'month': originalDate.getMonth() + 1,
            'year': originalDate.getFullYear()
          });
        }

        if (i == vm.quantityDays) {
          if (originalDate.getDay() != 6) {
            for (j = originalDate.getDay(); j < 6; j++) {
              vm.tmpDays.push({'class': 'invalid-days', 'number': '0'});
            }
          }
          vm.tmpMonth['days'] = vm.tmpDays;
          console.log("MES");
          console.log(vm.tmpMonth);
          vm.array.push(vm.tmpMonth);
        }

      }
      console.log($scope.holidays);

      originalDate.setDate(originalDate.getDate() + 1);
      console.log(originalDate);
    }

      console.log("USER");
      console.log(response);
    });

    vm.showCalendar = true;


  };

}
