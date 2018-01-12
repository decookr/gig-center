myApp.controller('SongController', function (SongService) {
    var vm = this;
    vm.songs = SongService.songs;
    SongService.getSongs();
    vm.addSong = SongService.addSong;
    vm.editSong = SongService.editSong;
    vm.deleteSong = SongService.deleteSong;
    vm.addSongsToGig = SongService.addSongsToGig;
});
