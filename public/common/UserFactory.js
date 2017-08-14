angular.module('DataClubsModule').factory('User', function UserFactory($http) {
    return {
        me: function() {
            return $http.get('/api/me/');
        }
    };
});