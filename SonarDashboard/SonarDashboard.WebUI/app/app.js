var app = angular.module('sonarDashboard',
[
    'sonarDashboard.Routes',
    'sonarDashboard.Services',
    'sonarDashboard.Home',
    'angular-loading-bar'
]);

var routesModule = angular.module('sonarDashboard.Routes', ['ngRoute']);

var servicesModule = angular.module('sonarDashboard.Services', []);

var homeModule = angular.module('sonarDashboard.Home', ['sonarDashboard.Services', 'ngRoute']);