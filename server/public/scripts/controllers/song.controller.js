myApp.controller('SongController', function (SongService) {
    console.log('SongController loaded');
    
    var vm = this;
    // vm.userService = UserService;
    vm.songs = SongService.songs;
    SongService.getSongs();
    // vm.addGig = GigService.addGig;
});