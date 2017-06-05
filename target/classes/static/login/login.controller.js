/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
app.controller('loginController', function($scope) {
    $scope.headingTitle = "Login";
    $scope.username;
    $scope.password;
    $scope.login = function () {
        alert($scope.username + $scope.password);
    }
});