myApp.controller('GigDetailsController', ['GigDetailsService', '$routeParams', '$route', function (GigDetailsService, $routeParams, $route) {
    console.log($routeParams);
    
    var vm = this;
    vm.gig = GigDetailsService.gig;
    vm.gigSongs = GigDetailsService.gigSongs;
    GigDetailsService.getGigDetail($routeParams.gigId);
    GigDetailsService.getGigSongs($routeParams.gigId);
    // $route.reload();

    vm.deleteGigSong = GigDetailsService.deleteGigSong;
    vm.editSongOrder = GigDetailsService.editSongOrder;
    // vm.reloadRoute = GigDetailsService.reloadRoute;


}]);
