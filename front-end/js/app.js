var myApp = angular.module('myApp', ['ngMaterial', 'ui.router','ncy-angular-breadcrumb'])
.config(['$urlRouterProvider', '$stateProvider', '$mdThemingProvider',
         function ($urlRouterProvider, $stateProvider, $mdThemingProvider) {

             $urlRouterProvider.otherwise('/');
             $stateProvider
                 .state('home', {
                 url: '/',
                 templateUrl: 'templates/home.html',
                 controller: 'homeCtrl',
                 ncyBreadcrumb: {
                     label: 'Home page'
                 }
             })
                 .state('about', {
                 url: '/about',
                 templateUrl: 'templates/aboutUS.html',
                 ncyBreadcrumb: {
                     label: 'About page'
                 }
             })


             $mdThemingProvider.definePalette('primaryColorPalette', {
                 "50": "fefefe",
                 "100": "fdfdfd",
                 "200": "fbfcfc",
                 "300": "f9fbfb",
                 "400": "f8fafa",
                 "500": "f7f9f9",
                 "600": "f6f8f8",
                 "700": "f5f7f7",
                 "800": "f3f6f6",
                 "900": "f1f5f5",
                 "A100": "ffffff",
                 "A200": "ffffff",
                 "A400": "ffffff",
                 "A700": "ffffff",
                 "contrastDefaultColor": "light",

                 'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
                 "contrastDarkColors": ["50", "100", "200"]
             });
             $mdThemingProvider.definePalette('secondaryColorPalette', {
                 "50": "e0f0ed",
                 "100": "b3dbd1",
                 "200": "80c3b3",
                 "300": "4daa94",
                 "400": "26987d",
                 "500": "008666",
                 "600": "007e5e",
                 "700": "007353",
                 "800": "006949",
                 "900": "005638",
                 "A100": "4DAA94",
                 "A200": "26987D",
                 "A400": "007E5E",
                 "A700": "007353",
                 "contrastDefaultColor": "light",
                 "contrastDarkColors": "50 100 A100"
             });
             $mdThemingProvider.theme('default')
                 .primaryPalette('secondaryColorPalette')
                 .accentPalette('primaryColorPalette');
         }]);
