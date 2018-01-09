myApp.service('GigDetailsService', ['$http', '$location', function ($http, $location, GigDetailsService) {

    var self = this;
    self.gig = { details: {} };

    //GET gig detail
    self.getGigDetail = function (gigId) {
        console.log('gigToGet:', gigId);
        $http({
            method: 'GET',
            url: '/gigDetails/',
            params: {
                gigId: gigId
            }
        }).then(function (response) {
            console.log('response getGigDetail', response.data);
            self.gig.details = response.data;
        });
    };

}]);