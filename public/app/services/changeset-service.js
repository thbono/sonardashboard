servicesModule
    .factory('changesetService', [
        '$http', '$base64',
        function($http, $base64) {
            var baseApiUrl = 'http://192.168.198.26:8080/tfs/DefaultCollection/_apis/tfvc/changesets';
            var service = [];

            var _changesetsSearch = function(fromDate, author) {
                return $http({
                    url: baseApiUrl + '?$top=1&searchCriteria.fromDate=' + fromDate + '&searchCriteria.author=' + author,
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + $base64.encode('Qualidade' + ':' + '!@#Mudar')
                    }
                }).success(function(data) {
                    return data;
                }).error(function(data) {
                    return data;
                });
            }

            service.changesetsSearch = _changesetsSearch;

            return service;
        }
    ]);
