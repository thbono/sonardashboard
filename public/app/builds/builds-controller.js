(function() {
    function buildsController($scope, $interval, projectService, buildService) {
        this.$scope = $scope;
        this.$interval = $interval;
        this.projectService = projectService;
        this.buildService = buildService;

        this.initialize();
    };

    buildsController.$inject = ['$scope', '$interval', 'projectService', 'buildService'];

    buildsController.prototype = {
        initialize: function() {
            this.$scope.projects = [];
            this.$scope.buildDefinitions = [];
            this.initializeProjects();
        },

        initializeProjects: function() {
            var self = this;
            this.projectService.projectsSearch()
                .then(function(result) {
                    self.$scope.projects = result.data.value;
                    self.initializeBuildDefinitions();
                });
        },

        initializeBuildDefinitions: function() {
            var self = this;
            angular.forEach(this.$scope.projects, function(project) {
                self.buildService.buildDefinitionsSearch(project.id)
                    .then(function(result) {
                        if (result.data.count <= 0) {
                            return;
                        }
                        var definitions = _.filter(result.data.value, function(definition) {
                            return definition.name.endsWith('.CI');
                        });
                        angular.forEach(definitions, function(definition) {
                            definition.status = 'succeeded';
                            definition.buildNumber = '';
                        });

                        self.$scope.buildDefinitions = definitions;
                        self.queryBuildStatus();
                    })
            })
        },

        queryBuildStatus: function() {
            var self = this;
            angular.forEach(this.$scope.buildDefinitions, function(definition) {
                self.buildService.latestBuildSearch(definition.project.id, definition.id)
                    .then(function(result) {
                        var build = result.data.value[0];
                        if (!build) {
                            return;
                        }

                        definition.status = result.data.value[0].result;
                        definition.buildNumber = result.data.value[0].buildNumber;
                    })
            });
        }
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
