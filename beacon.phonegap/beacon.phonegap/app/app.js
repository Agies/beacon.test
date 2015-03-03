angular.module('app', ['ionic'])

.run(function ($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window && window.Keyboard) {
            window.Keyboard.hideFormAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (window.estimote) {
            console.log("Estimotes enabled");
            function onBeaconsReceived(e) {
                angular.forEach(e.beacons, function(current) {
                    if (current.major == 36513) {
                        current.room = "OPS Room";
                    } else {
                        current.room = "Dev Room";
                    }
                });
                $broadcast('beaconsReceived', e);
            }
            document.addEventListener('beaconsReceived', onBeaconsReceived, false);

            $rootScope.startListening();
        }
    });
    $rootScope.startListening = function () {
        estimote.startRanging(null);
    };
    $rootScope.stopListening = function () {
        estimote.stopRanging();
    };
    function $broadcast() {
        return $rootScope.$broadcast.apply($rootScope, arguments);
    }
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "app/layout.html"
        })
        .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: 'app/dash/index.html',
                    controller: 'dash'
                }
            }
        }).state('tab.rooms', {
            url: '/rooms',
            views: {
                'tab-rooms': {
                    templateUrl: 'app/rooms/index.html',
                    controller: 'rooms'
                }
            }
        });

    $urlRouterProvider.otherwise('/tab/dash');

});
