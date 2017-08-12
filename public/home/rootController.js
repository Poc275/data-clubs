angular.module('DataClubsModule').controller('rootCtrl', function($scope, $http, $state, $mdDialog) {
    $scope.credentials = {
        email: "",
        password: ""
    };

    $scope.onSubmit = function() {
        $http.post('/api/login', $scope.credentials).then(function() {
            $state.go('profile.clubs');
        }, function(err) {
            // show invalid login dialog
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Invalid login attempt')
                  .textContent('The credentials you supplied are invalid')
                  .ariaLabel('Invalid login dialog')
                  .ok('Ok')
              );
        });
    };
});