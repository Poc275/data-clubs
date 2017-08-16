angular.module('DataClubsModule').controller('organisationCtrl', function($scope, $http, $state, $mdDialog, $location, $stateParams, Organisation) {
    $scope.orgName = $stateParams.org;
    $scope.orgId = $stateParams.orgId;
    $scope.logoUrl = $stateParams.orgLogoUrl;

    // load organisation members
    $scope.getOrganisationMembers = function() {
        Organisation.getMembers($scope.orgId).then(function(members) {
            $scope.organisationMembers = members.data;
        }, function(err) {
            console.log(err);
        });
    };

    $scope.showCreateMemberDialog = function(ev) {
        $mdDialog.show({
          controller: CreateMemberDialogController,
          templateUrl: '/organisations/create-member.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function(answer) {
            // update list of members
            $scope.getOrganisationMembers();
            
        }, function(err) {
            console.log(err);
        });
    };


    // in-line controller for the create new club dialog
    function CreateMemberDialogController($scope, $mdDialog, $stateParams) {
        $scope.orgName = $stateParams.org;
        $scope.orgId = $stateParams.orgId;

        $scope.member = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            organisation: $scope.orgId
        };

        $scope.onSubmit = function() {
            $http.post('/api/create/organisation/member', $scope.member).then(function() {
                $scope.hide();
            }, function(err) {
                console.log(err);
            });
        };

        $scope.validatePassword = function(form) {
            if($scope.member.password !== $scope.member.confirmPassword) {
                // passwords don't match
                form.confirmPassword.$setValidity('validationError', false);
            } else {
                form.confirmPassword.$setValidity('validationError', true);
            }
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }


    // init
    $scope.getOrganisationMembers();
});