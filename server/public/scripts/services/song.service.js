myApp.service('SongService', ['$http', '$location', function ($http, $location, SongService) {

    var self = this;

    self.songs = { list: [] };

    //GET all songs
    self.getSongs = function () {
        $http({
            method: 'GET',
            url: '/songs/',
        }).then(function (response) {
            self.songs.list = response.data;
        });
    };

    //add a song to songs table
    self.addSong = function (newSong) {
        swal({
            text: "Song added!",
            icon: "success",
        });
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
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Song deleted!", {
                        icon: "success",
                    });
                    $http({
                        method: 'DELETE',
                        url: '/songs/' + songToDelete.id,
                    }).then(function (response) {
                        self.getSongs();
                    });
                } else {
                    swal("Song not deleted");
                }
            });
    };

    //edit song information
    self.editSong = function (songToEdit) {
        swal({
            text: "Changes saved!",
            icon: "success",
        });
        $http({
            method: 'PUT',
            url: '/songs/',
            data: songToEdit,
        }).then(function (response) {
            self.getSongs();
        });
    }

    //add songs to a specified gig
    self.addSongsToGig = function (songsToAdd) {
        $http({
            method: 'POST',
            url: '/songs/gig-song',
            data: songsToAdd
        }).then(function (response) {

            self.getSongs();

        });
    }

}]);