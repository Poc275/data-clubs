angular.module('DataClubsModule').controller('profileCtrl', function($scope, $http, $state, $mdDialog, $location, $stateParams, Clubs, User) {
    $scope.clubIcons = [
        'bulb.svg',
        'airplane.svg',
        'tactics.svg',
        'stopwatch.svg',
        'speed.svg',
        'search.svg',
        'picture.svg',
        'map.svg',
        'folder.svg',
        'bank.svg'
    ];

    $scope.currentNavItem = 'clubs';
    $scope.customFullscreen = true;
    $scope.clubIcon = "";
    
    // get profile info
    $scope.getMyProfile = function() {
        User.me().then(function(user) {
            $scope.profile = user.data;
        }, function(err) {
            console.log(err);
        });
    };

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
            controller: CreateClubDialogController,
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

    $scope.signOut = function() {
        $http.get('/api/logout').then(function() {
            $location.path('/');
        }, function(err) {
            console.log(err);
        });
    };

    // pick an icon at random
    $scope.getRandomIcon = function() {
        return "images/icons/" + $scope.clubIcons[Math.floor(Math.random() * $scope.clubIcons.length)];
    };

    // in-line controller for the create new club dialog
    function CreateClubDialogController($scope, $mdDialog, Clubs) {
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

    $scope.getMyClubs();
    $scope.getMyProfile();

});