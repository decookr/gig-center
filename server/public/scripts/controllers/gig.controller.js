myApp.controller('GigController', ['GigService', 'UserService', function (GigService, UserService) {
    console.log('GigController loaded');
    
    var vm = this;
    vm.userService = UserService;
    vm.gigs = GigService.gigs;
    GigService.getGigs();
    vm.addGig = GigService.addGig;
    vm.users = UserService.users;
}]);
