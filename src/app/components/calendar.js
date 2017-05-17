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
function CalendarController($http, $compile, holydayService,$resource) {


  var vm= this;

  // vm.isHoliday=function(day){
  //   console.log("alo");
  //   // day['class']='holiday';
  //   var User = $resource('https://holidayapi.com/v1/holidays');
  //   User.get({
  //     year:day['year'],
  //     country:'US',
  //     key:'12ed68aa-eebb-4c0b-a37b-6d3202de35ef',
  //     day:day['number']
  //     ,month:day['month']}).$promise.then(
  //     function(data){
  //       console.log(data);
  //     },
  //     function(reason){
  //       console.log(reason);
  //     });
  // }
}
