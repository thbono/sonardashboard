homeModule
    .controller('homeController', [
        '$scope', 'issuesService', 'usersService',
        function($scope, issuesService, usersService) {
            var params = {
                p: 1,
                assigned: true,
                createdAfter: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().substring(0, 10),
                statuses: 'CONFIRMED,OPEN',
                ps: 5000
            };

            $scope.totalDebt = 0;

            $scope.searchIssues = function() {
                var issuesAlreadyRead = 0;
                var readIssues = function() {
                    params.p = params.p + 1;
                    issuesService.issuesSearch(params)
                        .then(function(result) {
                            $scope.totalIssues = result.data.total;
                            issuesAlreadyRead = issuesAlreadyRead + result.data.issues.length;
                            var debts = _.map(result.data.issues, 'debt');
                            _.each(debts, function(debt) {
                                $scope.totalDebt = $scope.totalDebt + juration.parse(debt);
                            });
                            $scope.totalDebtStr = juration.stringify($scope.totalDebt, {
                                format: 'micro'
                            });

                            if (issuesAlreadyRead < $scope.totalIssues) {
                                readIssues();
                            }
                        });
                };

                issuesService.issuesSearch(params)
                    .then(function(result) {
                        $scope.totalIssues = result.data.total;
                        issuesAlreadyRead = result.data.issues.length;
                        var debts = _.map(result.data.issues, 'debt');
                        _.each(debts, function(debt) {
                            $scope.totalDebt = $scope.totalDebt + juration.parse(debt);
                        });
                        $scope.totalDebtStr = juration.stringify($scope.totalDebt, {
                            format: 'micro'
                        });
                        readIssues();
                    });
            };


            $scope.searchUsers = function() {
                usersService.usersSearch(null)
                    .then(function(result) {
                        $scope.users = _.filter(result.data.users, function(user) {
                            return user.login !== 'admin';
                        });

                        angular.forEach($scope.users, function(user) {
                            var issuesParam = angular.copy(params);
                            issuesParam.p = 1;
                            issuesParam.assignees = user.login;
                            issuesService.issuesSearch(issuesParam)
                                .then(function(result) {
                                    user.totalIssues = result.data.total;
                                    var groupedIssues = _.groupBy(result.data.issues, 'rule');
                                    user.issues = _.map(groupedIssues, function(value, index) {
                                        return {
                                            rule: index,
                                            count: value.length,
                                            debt: _.reduce(value, function(memo, num) {
                                                return memo + juration.parse(num.debt);
                                            }, 0)
                                        };
                                    });
                                    var debts = _.map(user.issues, 'debt');
                                    user.totalDebt = _.reduce(debts, function(memo, num) {
                                        return memo + num;
                                    });
                                    user.totalDebtStr = juration.stringify(user.totalDebt, {
                                        format: 'micro'
                                    });
                                });
                        });
                    });
            };

            $scope.refreshAll = function () {
                $scope.users = [];
                $scope.searchIssues();
                $scope.searchUsers();
            };

            $scope.refreshAll();
        }
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                controller: 'homeController',
                templateUrl: 'app/home/home.html'
            });
        }
    ]);
