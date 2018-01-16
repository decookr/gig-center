myApp.controller('SongController', function (SongService, $mdToast) {
    var vm = this;
    vm.songs = SongService.songs;
    SongService.getSongs();
    vm.addSong = SongService.addSong;
    vm.editSong = SongService.editSong;
    vm.deleteSong = SongService.deleteSong;
    vm.addSongsToGig = SongService.addSongsToGig;
    // vm.showActionToast = SongService.showActionToast;

    vm.showActionToast = function (song) {        
        $mdToast.show(
            $mdToast.simple()
                .textContent(song + ' added to set list!')
                .position('bottom right')
                .hideDelay(1000)
        );
    }

});
