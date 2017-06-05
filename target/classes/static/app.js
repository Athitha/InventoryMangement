/**
 * Created by Athitha Ananthramu on 6/4/17.
 */
var app = angular.module('app', ['ngRoute','ngResource','ui.bootstrap']);
app.config(function($routeProvider){

    $routeProvider
        .when('/login',{
            templateUrl: '/login/login.html',
            controller: 'loginController'
        })
        .when('/admin', {
            templateUrl: '/admin/admin.html',
            controller: 'adminController'
        })
        .when('/user', {
            templateUrl: '/user/user.html',
            controller: 'userController'
        })

        .otherwise(
            { redirectTo: '/login'}
        );
});