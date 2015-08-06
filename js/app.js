var mainApp = angular.module('mainApp', ['ngRoute'])

// GET JSON
mainApp.factory('aboutFactory', function ($q, $http) {
    var aboutData = { content: null };

    function LoadData() {
        var defer = $q.defer();
        $http.get('json/about.json').success(function (data) {
            aboutData = data;
            defer.resolve();
        });
        return defer.promise;
    };

    return {
        GetJSON: function () { return aboutData; },
        LoadData: LoadData
    };
})

mainApp.factory('educationFactory', function ($q, $http) {
    var educationData = { content: null };

    function LoadData() {
        var defer = $q.defer();
        $http.get('json/education.json').success(function (data) {
            educationData = data;
            defer.resolve();
        });
        return defer.promise;
    }

    return {
        GetJSON: function () { return educationData; },
        LoadData: LoadData
    }
})

// CONTROLLERS
mainApp.controller('MainController', function ($scope, $location) {
    $scope.pages = [{
        id: '/about',
        label: 'About Me'
    }, {
        id: '/education',
        label: 'Education'
    }];
    $scope.states = {};
    $scope.$on('$viewContentLoaded', function () {
        $scope.states.activePage = $location.path();
    });
});

mainApp.controller('AboutController', function ($scope, aboutFactory) {
    $scope.about = aboutFactory.GetJSON();
});

mainApp.controller('EducationController', function ($scope, educationFactory) {
    $scope.education = educationFactory.GetJSON();
});

// ROUTING
mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'AboutController',
            resolve: {
                load: function (aboutFactory) {
                    return aboutFactory.LoadData();
                }
            }
        })
        .when('/education', {
            templateUrl: 'pages/education.html',
            controller: 'EducationController',
            resolve: {
                load: function (educationFactory) {
                    return educationFactory.LoadData();
                }
            }
        }).
        otherwise({
            redirectTo: '/about'
        });
});