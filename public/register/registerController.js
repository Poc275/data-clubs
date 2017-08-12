angular.module('DataClubsModule').controller('registerCtrl', function($scope, $http, $state) {
    $scope.credentials = {
        name: "",
        email: "",
        password: "",
        organisation: ""
    };

    $scope.validatePassword = function(form) {
        if($scope.credentials.password !== $scope.credentials.confirmPassword) {
            // passwords don't match
            form.confirmPassword.$setValidity('validationError', false);
        } else {
            form.confirmPassword.$setValidity('validationError', true);
        }
    };

    $scope.onSubmit = function() {
        $http.post('/api/register', $scope.credentials).then(function() {
            $state.go('profile');
        });
    };
});