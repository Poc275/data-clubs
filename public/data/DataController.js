angular.module('DataClubsModule').controller('dataCtrl', function($scope, $http, $state, $mdDialog, $location, $stateParams, Clubs, User) {
    $scope.clubId = $stateParams.club._id;

    $scope.getClubDatasets = function() {
        Clubs.getDatasets($scope.clubId).then(function(datasets) {
            $scope.clubDatasets = datasets.data;
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getSponsoredDatasets = function() {
        Clubs.getSponsoredDatasets().then(function(datasets) {
            $scope.sponsoredDatasets = datasets.data;
        }, function(err) {
            console.log(err);
        });
    };
    
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
            // update datasets list
            $scope.getClubDatasets();
            $scope.getSponsoredDatasets();

        }, function(err) {
            // dialog was cancelled
        });
    };

    function UploadDatasetDialogController($scope, $mdDialog, $stateParams, FileUploader) {
        $scope.uploader = new FileUploader();
        $scope.uploader.queueLimit = 1;
        $scope.uploader.url = "/api/create/dataset/";
        $scope.uploadProgress = 0;

        $scope.dataset = {
            name: "",
            description: "",
            tags: "",
            clubId: $stateParams.club._id
        };

        $scope.onSubmit = function() {
            console.log('uploading: ', $scope.dataset);

            // assign form data to fileItem to send together
            $scope.uploader.queue[0].formData[0] = $scope.dataset;

            $scope.uploader.queue[0].onProgress = function(progress) {
                $scope.uploadProgress = progress;
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

    $scope.getClubDatasets();
    $scope.getSponsoredDatasets();
});