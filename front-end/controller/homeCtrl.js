angular
    .module('myApp')
    .controller('homeCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
        $scope.title = "Home";
    }]);