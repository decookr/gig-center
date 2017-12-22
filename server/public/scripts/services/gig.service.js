myApp.service('GigService', ['$http', '$location', function ($http, $location, GigService){
    
    var self = this;

    self.gigs = { list: [] };  //empty array for gigs to go into, use object

    self.getGigs = function () {
        $http({
            method: 'GET',
            url: '/gigs/',
        }).then(function (response) {
            console.log('response', response.data); ///response.data will just send back the array of objects, not all the extra info
            self.gigs.list = response.data;
        });
    };

    self.addGig = function (newGig) {
        $http({
            method: 'POST',
            url: '/gigs/',
            data: newGig,
        }).then(function (response) {
            self.getGigs();
            newGig.date='',
            newGig.location='',
            newGig.start_time='',
            newGig.end_time='',
            newGig.load_time='',
            newGig.gig_song_id='',
            newGig.details=''
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