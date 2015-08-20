homeModule
    .controller('homeController', [
        '$scope', 'issuesService', 'usersService', function ($scope, issuesService, usersService) {
            var params = {
                assigned: true,
                createdAfter: new Date(new Date().getFullYear(), new Date().getMonth() -1, 1).toISOString().substring(0, 10),
                statuses: 'CONFIRMED,OPEN',
                ps: 1000
            };

            $scope.params = params;
            issuesService.issuesSearch(params)
                .then(function (result) {
                    $scope.totalIssues = result.data.total;
                });

            usersService.usersSearch(null)
                .then(function(result) {
                    $scope.users = result.data.users;
                    angular.forEach($scope.users, function (user) {
                        var issuesParam = angular.copy(params);
                        issuesParam.assignees = user.login;
                        issuesService.issuesSearch(issuesParam)
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
