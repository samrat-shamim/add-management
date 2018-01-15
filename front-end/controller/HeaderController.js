angular
    .module('myApp')
    .controller('headerCtrl', ['$scope', '$mdDialog','$mdSidenav', function ($scope, $mdDialog, $mdSidenav) {
        var vm = this;
        var originatorEv;

        vm.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        vm.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };


    }]);