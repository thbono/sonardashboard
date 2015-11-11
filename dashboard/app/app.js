var app = angular.module('sonarDashboard',
[
    'sonarDashboard.Routes',
    'sonarDashboard.Services',
    'sonarDashboard.Common',
	'sonarDashboard.Semana',
    'sonarDashboard.Mes',	
    'angular-loading-bar',
    'base64'
]);

var routesModule = angular.module('sonarDashboard.Routes', ['ngRoute']);

var servicesModule = angular.module('sonarDashboard.Services', ['base64']);

var commonModule = angular.module('sonarDashboard.Common', ['ngRoute'])

var semanaModule = angular.module('sonarDashboard.Semana', ['sonarDashboard.Services', 'ngRoute']);

var mesModule = angular.module('sonarDashboard.Mes', ['sonarDashboard.Services', 'ngRoute']);