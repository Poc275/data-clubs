angular.module('DataClubsModule').controller('clubAdminCtrl', function($scope, $http, $state, $mdDialog, $location, $stateParams, Clubs, Organisation) {
    $scope.clubName = $stateParams.name;
    $scope.clubId = $stateParams.clubId;

    // load organisations for this club
    $scope.getClubOrganisations = function() {
        Clubs.getMembers($scope.clubId).then(function(orgs) {
            $scope.clubOrganisations = orgs.data;
        }, function(err) {
            console.log(err);
        });
    };

    $scope.showOrganisationDialog = function(ev) {
        $mdDialog.show({
          controller: OrganisationDialogController,
          templateUrl: '/organisations/add-organisation.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function(answer) {
            // update list of orgs
            $scope.getClubOrganisations();
        }, function(err) {
            console.log(err);
        });
    };

    // in-line controller for the organisation dialog
    function OrganisationDialogController($scope, $mdDialog, $stateParams, FileUploader) {
        $scope.clubName = $stateParams.name;
        $scope.uploader = new FileUploader();
        $scope.uploader.queueLimit = 1;
        $scope.uploader.url = "/api/create/organisation/";

        $scope.organisation = {
            name: "",
            type: "Customer",
            clubId: $stateParams.clubId
        };

        $scope.addOrgModel = {
            orgId: "",
            clubId: $stateParams.clubId
        };

        // create new organisation and add to the club
        $scope.createOrgOnSubmit = function() {
            // assign form data to fileItem to send together
            $scope.uploader.queue[0].formData[0] = $scope.organisation;

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

        // add organisation to the club
        $scope.addOrgOnSubmit = function() {
            $http.post('/api/add/organisation', $scope.addOrgModel).then(function() {
                $scope.hide();
            }, function(err) {
                console.log(err);
            });
        };

        // get list of organisations for add organisation dialog drop-down
        $scope.getOrganisations = function() {
            Organisation.all().then(function(orgs) {
                $scope.orgs = orgs.data;
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

    $scope.getClubOrganisations();
});