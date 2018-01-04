myApp.service('SongService', ['$http', '$location', function ($http, $location, SongService) {

    var self = this;

    self.songs = { list: [] };  //empty array for songs to go into, use object

    self.getSongs = function () {
        $http({
            method: 'GET',
            url: '/songs/',
        }).then(function (response) {
            console.log('response', response.data); ///response.data will just send back the array of objects, not all the extra info
            self.songs.list = response.data;
        });
    };

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

    self.deleteSong = function (songToDelete) {
        $http({
            method: 'DELETE',
            url: '/songs/' + songToDelete.id,
        }).then(function (response) {
            self.getSongs();
        });
    };

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

}]);