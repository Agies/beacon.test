angular.module('app')
    .controller('dash', function ($scope, $timeout) {
        $scope.beacons = [];
        $scope.$on('beaconsReceived', function (sender, evt) {
            $timeout(function () {
                $scope.beacons = evt.beacons;
            });
        });
    });