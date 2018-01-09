myApp.controller('GigDetailsController', ['GigDetailsService', '$routeParams', function (GigDetailsService, $routeParams) {
    console.log('GigDetailsController loaded');
    console.log($routeParams);
    
    var vm = this;
    vm.gig = GigDetailsService.gig;
    GigDetailsService.getGigDetail($routeParams.gigId);
    // vm.userService = UserService;
    // vm.gigs = GigService.gigs;
    // vm.userGigs = GigService.userGigs;
    // GigService.getGigs();
    // GigService.getUserGigs();
    // vm.addGig = GigService.addGig;
    // vm.users = UserService.users;
    // vm.deleteGig = GigService.deleteGig;
    // vm.editGig = GigService.editGig;
}]);
