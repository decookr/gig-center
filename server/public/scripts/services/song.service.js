myApp.service('SongService', ['$http', '$location', function ($http, $location, SongService) {

    var self = this;

    self.songs = { list: [] };

    //GET all songs
    self.getSongs = function () {
        $http({
            method: 'GET',
            url: '/songs/',
        }).then(function (response) {
            console.log('response', response.data);
            self.songs.list = response.data;
        });
    };

    //add a song to songs table
    self.addSong = function (newSong) {
        $http({
            method: 'POST',
            url: '/songs/',
            data: newSong
        }).then(function (response) {
            self.getSongs();
            newSong.title = '',
                newSong.artist = '',
                newSong.length = '',
                newSong.bpm = '',
                newSong.key = '',
                newSong.recording_url = '',
                newSong.pdf_url = ''
        });
    }

    //delete a song from song list
    self.deleteSong = function (songToDelete) {
        $http({
            method: 'DELETE',
            url: '/songs/' + songToDelete.id,
        }).then(function (response) {
            self.getSongs();
        });
    };

    //edit song information
    self.editSong = function (songToEdit) {
        console.log(songToEdit);
        $http({
            method: 'PUT',
            url: '/songs/',
            data: songToEdit,
        }).then(function (response) {
            console.log('response', response);
            self.getSongs();
        });
    }

    //add songs to a specified gig
    self.addSongsToGig = function (songsToAdd) {
        console.log('songs to add:', songsToAdd);
        $http({
            method: 'POST',
            url: '/songs/gig-song',
            data: songsToAdd
        }).then(function (response) {
            console.log(response);

            self.getSongs();

        });
    }

}]);