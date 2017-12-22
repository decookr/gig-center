myApp.service('SongService', ['$http', '$location', function ($http, $location, SongService){
    
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
            newSong.title='',
            newSong.artist='',
            newSong.length='',
            newSong.bpm='',
            newSong.key='',
            newSong.recording_url='',
            newSong.pdf_url=''
        });
    }

//     // self.deleteHero = function (heroToDelete) {
//     //     console.log(heroToDelete);
//     //     $http({
//     //         method: 'DELETE',
//     //         url: '/hero/' + heroToDelete.id,
//     //     }).then(function (response) {
//     //         console.log('response', response);
//     //         self.getHero();
//     //     });
//     // };

}]);