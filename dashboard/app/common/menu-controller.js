(function() {
    function menuController($scope, $location) {
        this.$scope = $scope;
        this.$location = $location;
    };

    menuController.$inject = ['$scope', '$location'];

    menuController.prototype = {
        menuClass: function (page) {
            var current = this.$location.path().substring(1);
            return current.indexOf(page) > -1 ? "active" : "";
        }
    }

    commonModule
        .controller('menuController', menuController);
})();
