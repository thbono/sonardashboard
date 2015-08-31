(function() {
    function dashboardController($scope, issuesService, usersService) {
        this.$scope = $scope;
        this.issuesService = issuesService;
        this.usersService = usersService;
        this.initialize();
        this.refresh();
    };

    dashboardController.$inject = ['$scope', 'issuesService', 'usersService'];

    dashboardController.prototype = {
        initialize: function() {
            this.$scope.users = [];
            this.$scope.totalIssues = 0;
            this.$scope.totalDebt = 0;
            this.$scope.totalDebtStr = '0';
            this.$scope.issuesProcessed = 0;
        },

        refresh: function() {
            this.initialize();
            this.getTotals();
            this.getUsers();
        },

        getCurrentMonth: function() {
            return new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().substring(0, 10);
        },

        getSearchParams: function(page) {
            return {
                p: page,
                assigned: true,
                createdAfter: this.getCurrentMonth(),
                statuses: 'CONFIRMED,OPEN',
                ps: 5000
            };
        },

        getTotals: function(page) {
            var self = this;

            var params = this.getSearchParams(page || 1);

            this.issuesService.issuesSearch(params)
                .then(function(result) {
                    self.totalsSearchCallback(result.data);
                });
        },

        totalsSearchCallback: function(data) {
            this.$scope.issuesProcessed = data.issues.length;
            this.$scope.totalIssues = data.total;

            if (this.$scope.issuesProcessed <= this.$scope.totalIssues && data.issues.length > 0) {
                this.calculateTotalDebt(data);
            }
        },

        calculateTotalDebt: function(data) {
            var self = this;
            var debtArray = _.map(data.issues, 'debt');

            if (!debtArray) {
                return;
            }

            angular.forEach(debtArray, function(debt) {
                if (!debt) {
                    return;
                }

                self.$scope.totalDebt += juration.parse(debt);
            });

            if (self.$scope.totalDebt) {
                self.$scope.totalDebtStr = juration.stringify(self.$scope.totalDebt, {
                    format: 'micro'
                });
            }

            self.getTotals(data.p + 1);
        },

        getUsers: function() {
            var self = this;

            this.usersService.usersSearch(null)
                .then(function(result) {
                    self.usersSearchCallback(result.data.users);
                });
        },

        usersSearchCallback: function(users) {
            var self = this;

            this.$scope.users = this.filterUsers(users);

            angular.forEach(this.$scope.users, function(user) {
                self.getUsersIssuesAndDebt(user);
            });
        },

        filterUsers: function(users) {
            return _.filter(users, function(user) {
                return user.login !== 'admin';
            });
        },

        getUsersIssuesAndDebt: function(user) {
            var self = this;

            var issuesParam = this.getSearchParams(1);
            issuesParam.assignees = user.login;

            this.issuesService.issuesSearch(issuesParam)
                .then(function(result) {
                    self.userIssuesAndDebtSearchCallback(user, result.data);
                });
        },

        userIssuesAndDebtSearchCallback: function(user, data) {
            user.totalIssues = data.total;

            var groupedIssues = _.groupBy(data.issues, 'rule');

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
            }) || 0;

            user.totalDebtStr = juration.stringify(user.totalDebt, {
                format: 'micro'
            }) || "0m";
        }
    }

    dashboardModule
        .controller('dashboardController', dashboardController)
        .config([
            '$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/dashboard', {
                    controller: 'dashboardController',
                    templateUrl: 'app/dashboard/index.html'
                });
            }
        ]);
})();
