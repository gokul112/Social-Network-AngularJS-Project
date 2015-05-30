'use strict';

app.controller('UserEditProfileController',
    function ($scope, $rootScope, $location, authenticationService, notifyService) {
        $rootScope.pageTitle = "Edit Profile";

        $scope.getUserProfile = function() {
            authenticationService.getDataAboutMe(
                function success(data) {
                    $scope.userData = data;
                },
                function error(err) {
                    notifyService.showError("Cannot load user data", err);
                }
            );
        };

        $scope.updateProfile = function(userData) {
            authenticationService.editProfile(userData,
                function success() {
                    notifyService.showInfo("User edited successfully");
                },
                function error(err) {
                    notifyService.showError("User edit failed", err);
                }
            );
        };

        $scope.changePassword = function(passData) {
            authenticationService.changePass(passData,
                function success() {
                    notifyService.showInfo("Password changed successfully");
                },
                function error(err) {
                    notifyService.showError("Password change failed", err);
                }
            );
        };
    }
);