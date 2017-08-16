angular.module('DataClubsModule').factory('Organisation', function OrganisationFactory($http) {
    return {
        all: function() {
            return $http.get('/api/organisations/all');
        },
        getMembers: function(id) {
            return $http.get('/api/organisations/' + id + '/members');
        }
    };
});