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
    app.controller('adminController', function($scope, $window, $http, $modal, $rootScope, $timeout, $location) {
        $scope.headingTitle = "Admin";
        $(document).ready(function () {
            init();
        });
        $scope.name;
        $scope.price;
        $scope.quantity;
        $scope.description;
        $scope.updateprice;
        $scope.updatequantity;
        $scope.updatedescription;

        $scope.removeitemlist = [];

        $scope.reload = function () {
            $location.path("/admin");
        }

        $scope.checkout = checkout;
        $scope.openAddItemModal = function () {

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
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        $scope.refresh = function () {
            init();
        }

        $scope.openUpdateModal = function (item) {

            var modalInstance = $modal.open({
                templateUrl: 'admin/modifyItemModal.html',
                controller: UpdateModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    item: item
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        $scope.openRemoveModal = function () {

            var modalInstance = $modal.open({
                templateUrl: 'admin/removeItemModal.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        $scope.additem = function () {
           var item = {
               name: $scope.name,
               price: $scope.price,
               quantity: $scope.quantity,
               description: $scope.description
           }


            $http.post('http://localhost:8080/inventory/addItem', item).
            then(function(data, status, headers, config) {
                var message = data;
                console.log(message);
                $rootScope.cancel();
            });
            init();
        }

        $scope.updateitem =  function (item) {
            var item = {
                name: item.name,
                price: $scope.updateprice,
                quantity: $scope.updatequantity,
                description: $scope.updatedescription
            }


            $http.post('http://localhost:8080/inventory/updateItem', item).
            then(function(data, status, headers, config) {
                var message = data;
                console.log(message);
                $rootScope.cancel();
            });
            init();
        }

        $scope.itemCheck = function (item) {
            if($scope.removeitemlist.indexOf(item.name) < 0){
                $scope.removeitemlist.push(item.name);
                console.log($scope.removeitemlist);
            }else if($scope.removeitemlist.indexOf(item.name) >= 0) {
                $scope.removeitemlist.splice($scope.removeitemlist.indexOf(item.name), 1);
                console.log($scope.removeitemlist);
            }
        }

        $scope.removeItem = function () {
            $scope.removeitemlist.forEach(function (item) {
                var item = {
                    name: item,
                    out0fstock: true
                }
                $http.post('http://localhost:8080/inventory/removeItem', item).
                then(function(data, status, headers, config) {
                    var message = data;
                    console.log(message);
                    $rootScope.cancel();
                });
                init();
            });
        }
        function init() {
            $http.get('http://localhost:8080/inventory/findAllItemsAdmin').
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
                $scope.alerts= [
                    { type: 'success', msg: 'Item checkedout successfully' }
                ];
                $timeout(function () {
                    $scope.alerts = [];
                }, 3000);
            });
        }

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

    })

    app.controller('userController', function ($scope, $window, $http, $timeout) {
        $scope.headingTitle = "User";
        $(document).ready(function () {
            inituser();
        });
        $scope.checkoutuser = checkoutuser;

        function checkoutuser(item) {
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
                inituser()
                $scope.alerts= [
                    { type: 'success', msg: 'Item checkedout successfully' }
                ];
                $timeout(function () {
                    $scope.alerts = [];
                }, 3000);
            });
        }

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        function inituser() {
            $http.get('http://localhost:8080/inventory/findAllItemsUser').
            then(function(response) {
                $scope.useritemlist = response.data;
                console.log($scope.itemlist);
            });
        }

        $scope.refreshuser = function () {
            inituser();
        }

    })
    var ModalInstanceCtrl = function($scope, $modalInstance, $rootScope) {

        $scope.items = $scope.itemlist;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $rootScope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
    var UpdateModalInstanceCtrl = function($scope, $modalInstance, $rootScope, item) {

        $scope.item = item;
        $scope.items = $scope.itemlist;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $rootScope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
    }

 })();