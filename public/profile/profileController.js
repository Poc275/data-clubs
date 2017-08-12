angular.module('DataClubsModule').controller('profileCtrl', function($scope, $http, $state, $mdDialog, Clubs) {
    $scope.currentNavItem = 'clubs';
    $scope.customFullscreen = false;

    $scope.getMyClubs = function() {
        Clubs.myClubs().then(function(clubs) {
            $scope.myClubs = clubs.data;
        }, function(err) {
            console.log(err);
        });
    };

    // create new data club dialog
    $scope.showCreateClubDialog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/clubs/create-new-club.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            // update my clubs list
            $scope.getMyClubs();

        }, function() {
            // dialog was cancelled
        });
    };

    $scope.getMyClubs();

    // in-line controller for the create new club dialog
    function DialogController($scope, $mdDialog, Clubs) {
        $scope.club = {
            name: "",
            description: "",
            tags: "",
            open: false
        };

        $scope.onSubmit = function() {
            $http.post('/api/create/club', $scope.club).then(function() {
                $scope.hide();

            }, function(err) {
                console.log(err);
            });
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }

});