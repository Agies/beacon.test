angular.module('app')
    .controller('rooms', function ($scope, $timeout) {
        var cache = {};
        $scope.distance = function () {
            return function(beacon) {
                return beacon.distance < 4;
            };
        };
        $scope.beacons = [];
        $scope.$on('beaconsReceived', function (sender, evt) {
            if ($scope.beacons && $scope.beacons.length >= evt.beacons.length) {
                angular.forEach(evt.beacons, function (current) {
                    if (cache[current.room])
                        cache[current.room].distance = current.distance;
                    else
                        cache[current.room] = current;
                });
            } else {
                angular.forEach(evt.beacons, function (current) {
                    cache[current.room] = current;
                });
                $timeout(function () {
                    $scope.beacons = evt.beacons;
                });
            }
        });
    });