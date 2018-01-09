myApp.controller('GigDetailsController', ['GigDetailsService', '$routeParams', function (GigDetailsService, $routeParams) {
    console.log($routeParams);
    
    var vm = this;
    vm.gig = GigDetailsService.gig;
    GigDetailsService.getGigDetail($routeParams.gigId);
}]);
