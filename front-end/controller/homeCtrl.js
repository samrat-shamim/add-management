angular
    .module('myApp')
    .controller('homeCtrl', ['$scope', '$mdDialog', '$http', '$q', '$mdToast', function ($scope, $mdDialog, $http, $q, $mdToast) {
        $scope.title = "Home";
        $scope.newAd = {
            name: 'Test Name',
            objective: 'Test Objective'
        };

        $scope.showActionToast = function(msg) {
            var toast = $mdToast.simple()
                .textContent(msg)
                .action('OK')
                .highlightAction(true)
                .highlightClass('md-accent')
                .position('top right');

            $mdToast.show(toast);
        };

        function init() {
            $scope.loadCampaigns();
        }

        $scope.loadCampaigns = function() {
            getCampaigns().then(
                function (response) {
                    $scope.response = response;
                    console.log(response);
                },
                function (error) {
                    console.error(error);
                }
            );
        };

        function getCampaigns() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:3000/ads/facebook/campaigns/'
            }).then(
                function (response) {
                    deferred.resolve(response);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        $scope.onSubmit= function() {
            addCampaign($scope.newAd).then(
                function (result) {
                    console.log(result);
                    $scope.showActionToast('Campaign Added')
                },
                function (error) {
                    console.error(error);
                }
            );
        };

        function addCampaign(data) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:3000/ads/facebook/campaigns/create-new/' + data.name,
                data: data,
                'Content-Type': 'x-www-form-urlencoded'
            }).then(
                function (response) {
                    deferred.resolve(response);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        init();
    }]);