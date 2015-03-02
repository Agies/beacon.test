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
        });

    $urlRouterProvider.otherwise('/tab/dash');

});
