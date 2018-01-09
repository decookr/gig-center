myApp.service('GigDetailsService', ['$http', '$location', function ($http, $location, GigDetailsService) {

    var self = this;
    self.gig = { details: {} };

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

}]);