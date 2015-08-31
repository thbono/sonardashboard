(function() {
    function buildsController($scope) {
        this.$scope = $scope;
    };

    buildsController.$inject = ['$scope'];

    buildsController.prototype = {

    }

    dashboardModule
        .controller('buildsController', buildsController)
        .config([
            '$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/builds', {
                    controller: 'buildsController',
                    templateUrl: 'app/builds/index.html'
                });
            }
        ]);
})();
