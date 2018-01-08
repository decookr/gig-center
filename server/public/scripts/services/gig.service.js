myApp.service('GigService', ['$http', '$location', function ($http, $location, GigService) {

    var self = this;
    self.gigs = { list: [] };
    self.userGigs = { list: [] };
    self.gigDetail = { list: [] };

    //GET all gigs
    self.getGigs = function () {
        $http({
            method: 'GET',
            url: '/gigs/',
        }).then(function (response) {
            console.log('response', response.data);
            self.gigs.list = response.data;
        });
    };

    //GET user gigs
    self.getUserGigs = function () {
        $http({
            method: 'GET',
            url: '/gigs/user_gig/',
        }).then(function (response) {
            console.log('response userGigs', response.data);
            self.userGigs.list = response.data;
        });
    };

    //GET gig detail
    self.getGigDetail = function (gig) {
        console.log('gigToGet:', gig);
        $http({
            method: 'GET',
            url: '/gigs/user_gig',
        }).then(function (response) {
            console.log('response getGigDetail', response.data);
            self.gigDetail.list = response.data;
        });
    };

    //add a gig
    self.addGig = function (newGig) {
        console.log(newGig);
        $http({
            method: 'POST',
            url: '/gigs/',
            data: newGig,
        }).then(function (response) {
            self.getGigs();
            newGig.date = '',
                newGig.location = '',
                newGig.start_time = '',
                newGig.end_time = '',
                newGig.load_time = '',
                newGig.gig_song_id = '',
                newGig.details = ''
        });
    }

    self.deleteGig = function (gigToDelete) {
        $http({
            method: 'DELETE',
            url: '/gigs/' + gigToDelete.id,
        }).then(function (response) {
            self.getGigs();
        });
    };

    self.editGig = function (gigToEdit) {
        console.log(gigToEdit);
        $http({
            method: 'PUT',
            url: '/gigs/',
            data: gigToEdit,
        }).then(function (response) {
            console.log('response', response);
            self.getGigs();
        });
    }
}]);