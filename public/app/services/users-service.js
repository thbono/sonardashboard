servicesModule
    .factory('usersService', [
        '$http', function ($http) {
            var baseApiUrl = 'http://192.168.198.26:5880/api/users/';
            var service = [];

            var _usersSearch = function (params) {
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

            service.usersSearch = _usersSearch;

            return service;
        }
    ]);
