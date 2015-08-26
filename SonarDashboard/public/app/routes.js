routesModule
    .config([
        '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.otherwise({
                redirectTo: '/dashboard'
            });

            $locationProvider.html5Mode(true);
        }
    ]);
