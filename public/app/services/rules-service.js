servicesModule
    .factory('rulesService', [
        '$http', function ($http) {
            var baseApiUrl = 'http://192.168.198.26:5880/api/rules/';
            var service = [];

            var _rulesSearch = function(params) {
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

            var _rulesShow = function (params) {
                return $http({
                    url: baseApiUrl + 'show',
                    method: 'GET',
                    params: params
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
            };

            service.rulesSearch = _rulesSearch;
            service.rulesShow = _rulesShow;

            return service;
        }
    ]);
