myApp.controller('GigController', ['GigService', 'UserService', function (GigService, UserService) {
    console.log('GigController loaded');
    
    var vm = this;
    vm.userService = UserService;
    vm.gigs = GigService.gigs;
    vm.userGigs = GigService.userGigs;
    GigService.getGigs();
    GigService.getUserGigs();
    vm.addGig = GigService.addGig;
    vm.users = UserService.users;
    vm.deleteGig = GigService.deleteGig;
    vm.editGig = GigService.editGig;
}]);
