myApp.service('GigService', ['$http', '$location', function ($http, $location, GigService) {

    var self = this;
    self.gigs = { list: [] };
    self.userGigs = { list: [] };

    //GET all gigs
    self.getGigs = function () {
        $http({
            method: 'GET',
            url: '/gigs/',
        }).then(function (response) {
            self.gigs.list = response.data;
        });
    };

    //GET gigs assigned to the current user
    self.getUserGigs = function () {
        $http({
            method: 'GET',
            url: '/gigs/user_gig/',
        }).then(function (response) {
            self.userGigs.list = response.data;
        });
    };

    //add a gig with assigned users
    self.addGig = function (newGig, users) {
        console.log('users object', newGig);
        swal({
            text: "Gig added!",
            icon: "success",
        });
        $http({
            method: 'POST',
            url: '/gigs/add-gig',
            data: newGig,
        }).then(function (response) {
            self.getGigs();
            newGig.date = '',
                newGig.location = '',
                newGig.start_time = '',
                newGig.end_time = '',
                newGig.load_time = '',
                newGig.gig_song_id = '',
                newGig.details = '';
            var gigId = response.data.rows[0];
            $http({
                method: 'POST',
                url: '/gigs/assign-users',
                data: {
                    users,
                    gigId
                }
            }).then(function (response) {
                self.getGigs();
                users.users_id = false;
            });
        });
    }


    //delete a gig
    self.deleteGig = function (gigToDelete) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this gig!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Gig deleted!", {
                        icon: "success",
                    });
                    $http({
                        method: 'DELETE',
                        url: '/gigs/' + gigToDelete.id,
                    }).then(function (response) {
                        self.getGigs();
                    });
                } else {
                    swal("Gig not deleted");
                }
            });
    };

    //edit all gig details
    self.editGig = function (gigToEdit) {
        swal({
            text: "Changes saved!",
            icon: "success",
        });
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