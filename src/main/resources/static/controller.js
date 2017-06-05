/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
(function () {
    'use strict';
app.controller('loginController', function($scope, $location) {
    $scope.headingTitle = "Login";
    $scope.username;
    $scope.password;
    $scope.login = function () {
        if($scope.username != null && $scope.password !=null) {
            if ($scope.username === "admin" && $scope.password === "admin") {
                $location.path("/admin");
            } else {
                $location.path("/user");
            }
        }

    }
})
    app.controller('adminController', function($scope, $window, $http, $modal) {
        $scope.headingTitle = "Admin";
        $(document).ready(function () {
            init();
        });
        $scope.showAddModal = false;
        $scope.checkout = checkout;
        $scope.openAddItemModal = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $modal.open({
                templateUrl: 'admin/addItemModal.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {

                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.ok = function () {
            $scope.showAddModal = false;
        }

        $scope.cancel = function () {
            $scope.showAddModal = false;
        }

        function init() {
            $http.get('http://localhost:8080/inventory/findAllItems').
            then(function(response) {
                $scope.itemlist = response.data;
                console.log($scope.itemlist);
            });
        }
        
        function checkout(item) {
            var item = {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                description: item.description
            }

            $http.post('http://localhost:8080/inventory/checkout', item).
            then(function(data, status, headers, config) {
                var message = data;
                console.log(message);
                init()
            });
        }

        /*function addItemModal(parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'addItemModal.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: lg,
                    appendTo: parentElem,
                    resolve: {
                        items: function () {
                            return $ctrl.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };*/


    })
    var ModalInstanceCtrl = function($scope, $modalInstance, $modal) {


        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();