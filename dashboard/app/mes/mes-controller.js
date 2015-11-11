(function() {
    function mesController($scope, issuesService) {
        this.$scope = $scope;

        this.issuesService = issuesService;        

        this.initialize();
        this.refresh();
    };

    mesController.$inject = ['$scope', 'issuesService'];

    mesController.prototype = {
        initialize: function() {
            this.$scope.users = [];            
            this.$scope.totalIssues = 0;
            this.$scope.totalDebt = 0;
            this.$scope.totalDebtStr = '0';            
			this.$scope.issuesPerUser = {};
        },

        refresh: function() {
            this.initialize();
            this.getTotals(1);            
        },

        getCurrentMonth: function() {
            return new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().substring(0, 10);
        },

        getSearchParams: function(page) {
            return {
                pageIndex: page,
				pageSize: 500,
                assigned: true,
                createdAfter: this.getCurrentMonth(),
                statuses: 'CONFIRMED,OPEN,REOPENED',                
				hideRules: true,
				extra_fields: 'assigneeName'
            };
        },

        getTotals: function(page) {
            var self = this;

            var params = this.getSearchParams(page);

            this.issuesService.issuesSearch(params)
                .then(function(result) {
                    self.totalsSearchCallback(result.data);
                });
        },

        totalsSearchCallback: function(data) {            
            this.$scope.totalIssues = data.paging.total;

            if (data.issues.length > 0) {
                this.calculateTotalDebt(data);
            }
        },

        calculateTotalDebt: function(data) {
            var self = this;					
			var userIssue;			
			var debt;
			
			angular.forEach(data.issues, function(issue) {				
				debt = juration.parse(issue.debt);							
			
				userIssue = self.$scope.issuesPerUser[issue.assignee] || { 
					login: issue.assignee, 
					name: issue.assigneeName, 
					totalIssues: 0, 
					totalDebt: 0, 
					totalDebtStr: '0',
					link: 'http://192.168.9.181:9000/issues/search#assignees=' + issue.assignee + '|resolved=false|sort=UPDATE_DATE|asc=false'
				};												
				userIssue.totalIssues++;				
				userIssue.totalDebt += debt;					
				self.$scope.issuesPerUser[issue.assignee] = userIssue;
				
				self.$scope.totalDebt += debt;
			});					
					

            if (data.paging.pages > data.paging.pageIndex) {
				self.getTotals(data.paging.pageIndex + 1);
			} else {
				angular.forEach(self.$scope.issuesPerUser, function(user) {
					user.totalDebtStr = juration.stringify(user.totalDebt, { format: 'micro' });							
					self.$scope.users.push(user);						
				});							
				
				self.$scope.totalDebtStr = juration.stringify(self.$scope.totalDebt, { format: 'micro' });					
			}
        }
    }

    mesModule
        .controller('mesController', mesController)
        .config([
            '$routeProvider',
            function($routeProvider) {
                $routeProvider.when('/dashboard/mes', {
                    controller: 'mesController',
                    templateUrl: 'dashboard/app/mes/index.html'
                });
            }
        ]);
})();
