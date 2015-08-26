servicesModule
    .factory('issuesService', [
        '$http', function ($http) {
            var baseApiUrl = 'http://192.168.198.26:5880/api/issues/';
            var service = [];

            var _issuesSearch = function (params) {
                return $http({
                    url: baseApiUrl + 'search',
                    method: 'GET',
                    params: params
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
            };

            var _issuesChangelog = function (params) {
                return $http({
                    url: baseApiUrl + 'changelog',
                    method: 'GET',
                    params: params
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
            };

            service.issuesSearch = _issuesSearch;
            service.issuesChangelog = _issuesChangelog;

            return service;
        }
    ]);
