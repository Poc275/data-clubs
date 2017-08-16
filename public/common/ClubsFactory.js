angular.module('DataClubsModule').factory('Clubs', function ClubsFactory($http) {
    return {
        myClubs: function() {
            return $http.get('/api/me/clubs/');
        },
        getMembers: function(id) {
            return $http.get('/api/club/' + id + '/organisations');
        }
    };
});