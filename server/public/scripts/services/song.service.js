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

    // self.addGig = function (newGig) {
    //     $http({
    //         method: 'POST',
    //         url: '/gigs/',
    //         data: newGig,
    //     }).then(function (response) {
    //         self.getGigs();
    //         newGig.date='',
    //         newGig.location='',
    //         newGig.start_time='',
    //         newGig.end_time='',
    //         newGig.load_time='',
    //         newGig.gig_song_id='',
    //         newGig.details=''
    //     });
    // }

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