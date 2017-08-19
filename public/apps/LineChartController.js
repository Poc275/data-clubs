angular.module('DataClubsModule').controller('lineChartCtrl', function($scope) {
    $scope.year = "2016";
    $scope.otherYear = "2015";
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.series = ['Airport 1', 'Airport 2', 'Airport 3'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40, 35, 27, 20, 31, 42],
        [28, 48, 40, 19, 86, 27, 90, 94, 71, 54, 40, 12],
        [47, 12, 45, 12, 30, 5, 17, 20, 21, 11, 4, 9]
    ];

    $scope.toggleYear = function() {
        // just an example of a reactive plot 
        // that toggles between years
        if($scope.year === "2016") {
            $scope.data = [
                [31, 47, 76, 53, 49, 43, 21, 37, 25, 36, 50, 20],
                [25, 31, 46, 12, 86, 60, 72, 80, 73, 52, 30, 29],
                [45, 10, 46, 21, 19, 7, 9, 11, 23, 15, 6, 13]
            ];
            $scope.year = "2015";
            $scope.otherYear = "2016";
        } else {
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40, 35, 27, 20, 31, 42],
                [28, 48, 40, 19, 86, 27, 90, 94, 71, 54, 40, 12],
                [47, 12, 45, 12, 30, 5, 17, 20, 21, 11, 4, 9]
            ];
            $scope.year = "2016";
            $scope.otherYear = "2015";
        }
    };
});