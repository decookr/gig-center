myApp.controller('GigController', function (GigService, UserService) {
    var vm = this;
    vm.userService = UserService;
    vm.gig = GigService;
});
