homeModule
    .controller('homeController', [
        '$scope', 'issuesService', 'usersService', function ($scope, issuesService, usersService) {
            var params = {
                assigned: true,
                createdAfter: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().substring(0, 10),
                statuses: 'CONFIRMED,OPEN',
                ps: 1000
            };

            $scope.params = params;
            issuesService.issuesSearch(params)
                .then(function (result) {
                    $scope.totalIssues = result.data.total;
                    console.log(result.data.issues);
                    var issues = _.map(result.data, 'issues');
                    console.log(issues);
                    var debts = _.map(issues, 'debt');
                    $scope.totalDebt = _.reduce(debts, function(memo, num) { return memo + juration.parse(num); });
                });

            usersService.usersSearch(null)
                .then(function (result) {
                    $scope.users = _.filter(result.data.users, function (user) {
                        return user.login !== 'admin';
                    });

                    angular.forEach($scope.users, function (user) {
                        var issuesParam = angular.copy(params);
                        issuesParam.assignees = user.login;
                        issuesService.issuesSearch(issuesParam)
                            .then(function (result) {
                                user.totalIssues = result.data.total;
                                var groupedIssues = _.groupBy(result.data.issues, 'rule');
                                user.issues = _.map(groupedIssues, function (value, index) {
                                    return {
                                        rule: index,
                                        count: value.length,
                                        debt: _.reduce(value, function (memo, num) { return memo + juration.parse(num.debt); }, 0)
                                    };
                                });
                                var debts = _.map(user.issues, 'debt');
                                user.totalDebt = (_.reduce(debts, function (memo, num) {
                                    return memo + num;
                                }) / 60) / 60;
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
