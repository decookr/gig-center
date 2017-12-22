myApp.controller('UserController', ['UserService','GigService',function(UserService, GigService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.gigs = GigService.gigs;
  vm.userObject = UserService.userObject;
  UserService.getAllUsers();
  vm.users = UserService.users;
}]);
