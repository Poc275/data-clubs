angular.module('DataClubsModule').controller('clubCtrl', function($scope, $http, $state, $mdDialog, $location, $stateParams, Clubs, Organisation) {
    $scope.club = $stateParams.club;
    $scope.currentNavItem = 'club';

});
