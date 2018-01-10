myApp.service('GigDetailsService', ['$http', '$location', function ($http, $location, GigDetailsService) {

    var self = this;
    self.gig = { details: {} };
    self.gigSongs = { list: {} };

    //GET details for each gig and display them in their own view using $routeparams
    self.getGigDetail = function (gigId) {
        $http({
            method: 'GET',
            url: '/gigDetails/',
            params: {
                gigId: gigId
            }
        }).then(function (response) {
            self.gig.details = response.data;
        });
    };

    //GET songs for specified gig from gig_song table
    self.getGigSongs = function (gigId) {
        console.log('gigSong id:', gigId);
        
        $http({
            method: 'GET',
            url: '/gigDetails/gigSongs',
            params: {
                gigId: gigId
            }
        }).then(function (response) {
            self.gigSongs.list = response.data;
        });
    };

}]);