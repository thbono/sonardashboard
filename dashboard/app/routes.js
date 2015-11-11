routesModule
    .config([
        '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.otherwise({
                redirectTo: '/dashboard/semana'
            });

            $locationProvider.html5Mode(true);
        }
    ]);
