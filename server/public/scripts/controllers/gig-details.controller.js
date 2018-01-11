myApp.controller('GigDetailsController', ['GigDetailsService', '$routeParams', function (GigDetailsService, $routeParams) {
    console.log($routeParams);

    var vm = this;
    vm.gig = GigDetailsService.gig;
    vm.gigSongs = GigDetailsService.gigSongs;
    GigDetailsService.getGigDetail($routeParams.gigId);
    GigDetailsService.getGigSongs($routeParams.gigId);
    vm.deleteGigSong = GigDetailsService.deleteGigSong;
    vm.editSongOrder = GigDetailsService.editSongOrder;

}]);
