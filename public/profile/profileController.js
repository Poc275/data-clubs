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

    // create new data club dialog
    $scope.showUploadDataset = function(ev) {
        $mdDialog.show({
            controller: UploadDatasetDialogController,
            templateUrl: '/data/upload-dataset.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            // update my clubs list
            // $scope.getMyClubs();

        }, function() {
            // dialog was cancelled
        });
    };

    $scope.getMyClubs();

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

    // in-line controller for the upload dataset dialog
    function UploadDatasetDialogController($scope, $mdDialog, FileUploader) {
        $scope.uploader = new FileUploader();
        $scope.uploader.queueLimit = 1;
        $scope.uploader.url = "/api/create/dataset/";

        $scope.dataset = {
            name: "",
            description: "",
            tags: ""
        };

        $scope.onSubmit = function() {
            // assign form data to fileItem to send together
            $scope.uploader.queue[0].formData[0] = $scope.dataset;

            $scope.uploader.queue[0].onProgress = function(progress) {
                console.log(progress);
            };

            $scope.uploader.queue[0].onSuccess = function(response, status, headers) {
                console.log('most success: ', response, status, headers);
                $scope.hide();
            };

            $scope.uploader.queue[0].onError = function(response, status, headers) {
                console.log('most regrettable: ', response);
                $scope.hide();
            };

            $scope.uploader.queue[0].upload();
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }

});