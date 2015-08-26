var app = angular.module('sonarDashboard',
[
    'sonarDashboard.Routes',
    'sonarDashboard.Services',
    'sonarDashboard.Dashboard',
    'angular-loading-bar',
    'base64'
]);

var routesModule = angular.module('sonarDashboard.Routes', ['ngRoute']);

var servicesModule = angular.module('sonarDashboard.Services', ['base64']);

var dashboardModule = angular.module('sonarDashboard.Dashboard', ['sonarDashboard.Services', 'ngRoute']);