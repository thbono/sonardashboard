servicesModule
    .factory('issuesService', [
        '$http', function ($http) {			
            var baseApiUrl = 'http://192.168.9.181:9000/api/issues/';
            var service = [];

            var _issuesSearch = function (params) {
                return $http({
                    url: baseApiUrl + 'search',
                    method: 'GET',		
					headers: {
						'Authorization': 'Basic dGlhZ28uYm9ubzohQCNNdWRhcg=='
					},
                    params: params
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
            };

            service.issuesSearch = _issuesSearch;            

            return service;
        }
    ]);
