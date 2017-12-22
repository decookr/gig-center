myApp.controller('GigController', function (GigService) {
    console.log('GigController loaded');
    
    var vm = this;
    // vm.userService = UserService;
    vm.gigs = GigService.gigs;
    GigService.getGigs();
    vm.addGig = GigService.addGig;
});
