angular.module('DataClubsModule').controller('clubCtrl', function($scope, $http, $state, $mdDialog, $location, $stateParams, Clubs, Organisation) {
    $scope.club = $stateParams.club;
    $scope.currentNavItem = 'club';

    $scope.getClubMembers = function() {
        Clubs.getMembers($scope.club._id).then(function(members) {
            $scope.clubMembers = members.data;
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getClubMembers();
});
