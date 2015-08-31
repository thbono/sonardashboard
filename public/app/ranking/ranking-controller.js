(function() {
    function rankingController($scope) {
        this.$scope = $scope;
    };

    rankingController.$inject = ['$scope'];

    rankingController.prototype = {

    }

    dashboardModule
        .controller('rankingController', rankingController)
        .config([
            '$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/ranking', {
                    controller: 'rankingController',
                    templateUrl: 'app/ranking/index.html'
                });
            }
        ]);
})();
