﻿var app = angular.module('FifthEditionEncounters', ['ngRoute', 'ngAnimate', 'ngResource', 'environment', 'wt.responsive', 'mgcrea.ngStrap', 'auth0.lock', 'angular-storage', 'angular-jwt', 'angularUtils.directives.dirPagination', 'pageslide-directive']);

app
    .constant('_', window._)
    .config([
        '$routeProvider', '$locationProvider', 'envServiceProvider', 'lockProvider', 'jwtInterceptorProvider', '$httpProvider', 'jwtOptionsProvider',
        function ($routeProvider, $locationProvider, envService, lockProvider, jwtInterceptorProvider, $httpProvider, jwtOptionsProvider) {
            $routeProvider
                .when('/home', { templateUrl: './Angular/Home/home.html', controller: 'HomeController' })
                .when('/dashboard', { templateUrl: './Angular/Dashboard/dashboard.html', controller: 'DashboardController', authorize: true })
                .when('/encounter', { templateUrl: './Angular/Encounter/encounter.html', controller: 'EncounterController' })
                .when('/tracker', { templateUrl: './Angular/Tracker/Tracker.html', controller: 'TrackerController' })
                .when('/tools', { templateUrl: './Angular/Tools/Tools.html', controller: 'ToolsController' })
                //.when('/login', { templateUrl: './Angular/Login/login.html', controller: 'LoginController' }) //Maybe later
                .when('/about', { templateUrl: './Angular/About/about.html', controller: 'AboutController' })
                .otherwise({ redirectTo: '/home' });

            $locationProvider.html5Mode(true);

            envService.config({
                domains: {
                    development: ['localhost'],
                    production: ['foxing-around.com', 'www.foxing-around.com']
                },
                vars: {
                    development: {
                        apiUrl: 'http://localhost:60533'
                    },
                    production: {
                        apiUrl: 'http://www.foxing-around.com'
                    }
                }
            });
            envService.check();

            var options = {
                auth: {
                    redirectUrl: envService.read('apiUrl') + '/home',
                    responseType: 'token',
                    params: {
                        scope: 'openid name email picture'
                    }
                }
            }

            lockProvider.init({
                domain: 'foxing-around.auth0.com',
                clientID: 'eYDiisAw4OLNYJwybpX1sLuUmPuyaJ91',
                options: options,
            });


            jwtInterceptorProvider.tokenGetter = function () {
                return localStorage.getItem('id_token');
            };

            jwtOptionsProvider.config({
                whiteListedDomains: ['foxing-around.com']
            });

            $httpProvider.interceptors.push('jwtInterceptor');
        }
    ])
    .run([
        '$rootScope', 'jwtHelper', 'lock', 'authService', 'authManager', '$location', 'LoginService', function ($rootScope, jwtHelper, lock, authService, authManager, $location, loginService) {
            angular.element(document).on("click", function (e) {
                $rootScope.$broadcast("documentClicked", angular.element(e.target));
            });
            $rootScope._ = window._;

            var token = localStorage.getItem('id_token');
            if (token != undefined) authManager.authenticate();

            authService.registerAuthenticationListener();

            authManager.checkAuthOnRefresh();
            authManager.redirectWhenUnauthenticated();

            if (!$rootScope.isAuthenticated) {
                $rootScope.$on("$routeChangeStart", function (evt, to, from) {
                    // requires authorization?
                    if (to.authorize === true) {
                        loginService.signIn();
                    }
                });
            }
        }
    ]);


