myApp.service('GigService', ['$http', '$location', function($http, $location, GigService, UserService){
    
    var self = this; //this self refers to service, not something else in project

//     // self.hero = { list: [] };  //empty array for companies to go into, use object

//     // self.getHero = function () {
//     //     $http({
//     //         method: 'GET',
//     //         url: '/hero/all',
//     //     }).then(function (response) {
//     //         console.log('response', response.data); ///response.data will just send back the array of objects, not all the extra info
//     //         self.hero.list = response.data;
//     //     });
//     // };

//     // self.addNewHero = function (newHero) {
//     //     $http({
//     //         method: 'POST',
//     //         url: '/hero/all',
//     //         data: newHero,
//     //     }).then(function (response) {
//     //         console.log('response', response);
//     //         self.getHero();
//     //         newHero.name='',
//     //         newHero.backstory='';
//     //     });
//     // }

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