var app = angular.module('sonarDashboard',
[
    'sonarDashboard.Routes',
    'sonarDashboard.Services',
    'sonarDashboard.Home',
    'angular-loading-bar',
    'base64'
]);

var routesModule = angular.module('sonarDashboard.Routes', ['ngRoute']);

var servicesModule = angular.module('sonarDashboard.Services', ['base64']);

var homeModule = angular.module('sonarDashboard.Home', ['sonarDashboard.Services', 'ngRoute']);