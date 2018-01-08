myApp.controller('GigController', ['GigService', 'UserService', function (GigService, UserService) {
    console.log('GigController loaded');
    
    var vm = this;
    vm.userService = UserService;
    vm.gigs = GigService.gigs;
    vm.userGigs = GigService.userGigs;
    vm.gigDetail = GigService.gigDetail;
    GigService.getGigs();
    GigService.getUserGigs();
    GigService.getGigDetail();
    vm.addGig = GigService.addGig;
    vm.users = UserService.users;
    vm.deleteGig = GigService.deleteGig;
    vm.editGig = GigService.editGig;
}]);
