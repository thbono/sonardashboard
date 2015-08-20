servicesModule
    .factory('sonarService', [
        '$http', function ($http) {
            var baseApiUrl = 'http://192.168.198.26:5880/api/';
            var service = [];

            var _issuesSearch = function(params) {
                return $http({
                    url: baseApiUrl + 'issues/search',
                    method: 'GET',
                    params: encodeURI(params)
                }).success(function(data) {
                    return data;
                }).error(function(data) {
                    return data;
                });
            };

            var _issuesChangelog = function (params) {
                return $http({
                    url: baseApiUrl + 'issues/changelog',
                    method: 'GET',
                    params: encodeURI(params)
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
            };

            var _usersSearch = function(params) {
                return $http({
                    url: baseApiUrl + 'users/search',
                    method: 'GET',
                    params: encodeURI(params)
                }).success(function(data) {
                    return data;
                }).error(function(data) {
                    return data;
                });
            };

            var _rulesSearch = function(params) {
                return $http({
                    url: baseApiUrl + 'rules/search',
                    method: 'GET',
                    params: encodeURI(params)
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
            };

            var _rulesShow = function (params) {
                return $http({
                    url: baseApiUrl + 'rules/show',
                    method: 'GET',
                    params: encodeURI(params)
                }).success(function (data) {
                    return data;
                }).error(function (data) {
                    return data;
                });
            };

            service.issuesSearch = _issuesSearch;
            service.issuesChangelog = _issuesChangelog;
            service.usersSearch = _usersSearch;
            service.rulesSearch = _rulesSearch;
            service.rulesShow = _rulesShow;

            return service;
        }
    ]);
