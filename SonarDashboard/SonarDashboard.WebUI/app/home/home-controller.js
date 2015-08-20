homeModule
    .controller('homeController', [
        '$scope', 'sonarService', function ($scope, sonarService) {
            var params = {
                assigned: true,
                createdAfter: new Date(new Date().getFullYear(), new Date().getMonth() -1, 1).toISOString().substring(0, 10),
                statuses: 'CONFIRMED,OPEN',
                ps: 1000
            };

            $scope.params = params;
            sonarService.issuesSearch(params)
                .then(function (result) {
                    $scope.totalIssues = result.data.total;
                });

            sonarService.usersSearch(null)
                .then(function(result) {
                    $scope.users = result.data.users;
                    angular.forEach($scope.users, function (user) {
                        var issuesParam = angular.copy(params);
                        issuesParam.assignees = user.login;
                        sonarService.issuesSearch(issuesParam)
                            .then(function(result) {
                                user.totalIssues = result.data.total;
                                var groupedIssues = _.groupBy(result.data.issues, function (issue) {
                                    return issue.rule;
                                });
                                user.issues = _.map(groupedIssues, function(issue) {
                                    return { rule: issue[0].rule, count: issue.length };
                                });
                                console.log(user.issues);
                            });
                    });
                });
        }
    ])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                controller: 'homeController',
                templateUrl: 'app/home/home.html'
            });
        }
    ]);
