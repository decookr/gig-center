myApp.controller('GigController', ['GigService', 'UserService', '$mdDialog', function (GigService, UserService, $mdDialog) {
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
