angular
  .module('app')
  .component('calendarComponent', {
    templateUrl: 'app/components/calendar.html',
    controller: CalendarController,
    bindings: {
      array: '<',
      months: '@',
      holidays: '@'
    }
  });
/** @ngInject */
function CalendarController($http, $compile, holydayService, $resource) {
  var vm = this;
  vm.daysOfTheWeek = [{
    'name': 'Sun'
  }, {
    'name': 'Mon'
  }, {
    'name': 'Tue'
  }, {
    'name': 'Wed'
  }, {
    'name': 'Thu'
  }, {
    'name': 'Fri'
  }, {
    'name': 'Sat'
  }];
}
