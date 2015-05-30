 app.controller('AuthenticationController', function ($scope, authenticationService,  notifyService) {

    $scope.getUserData = function() {
        authenticationService.getDataAboutMe(function(serverData) {
            $scope.userData = {
                'username': serverData.username,
                'name': serverData.name,
                'email': serverData.email,
                'profileImageData': serverData.profileImageData,
                'coverImageData': serverData.coverImageData
            };

            $('#gender' + serverData.gender).attr('checked', true);

        }, function () {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            notifyService.showError("There was an error retrieving the user data from the server.");
        });
    };

    $scope.login= function() {
        var username = $scope.username;
        var password = $scope.password;

        var data = {
            'username': username,
            'password' : password
        };

        authenticationService.login(data, function (serverData) {
            authenticationService.setCredentials(serverData);
            authenticationService.getDataAboutMe(function(successData) {
                authenticationService.setProfileImage(successData.profileImageData);
                authenticationService.setName(successData.name);

                $scope.navigateToPage('You have logged in successfully.');
            }, function() {
                notifyService.showError("Failed to to connect to the server.", error);
            })

        }, function (error) {
            notifyService.showError("The username or password are incorrect. Please try again.", error);
        });
    };

    $scope.register = function() {
        var username = $scope.username;
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        var name = $scope.name;
        var email = $scope.email;

        var data = {
            'username': username,
            'password': password,
            'confirmPassword': confirmPassword,
            'name': name,
            'email' : email
        };

        authenticationService.register(data, function (serverData) {
            authenticationService.setCredentials(serverData);

            $scope.navigateToPage('You have registered successfully.');
        }, function(error) {
            notifyService.showError("Error", error);
        });
    };

    $scope.editProfile = function() {
        var name = $scope.userData.name;
        var email = $scope.userData.email;
        var coverImage = $('#coverPictureData').attr('src');
        var profileImage = $('#profilePictureData').attr('src');
        var gender = $("input:radio[name=gender-radio]:checked").val();

        var data = {};
        data['name'] = name;
        data['email'] = email;
        data['profileImageData'] = profileImage;
        data['coverImageData'] = coverImage;
        data['gender'] = gender;

        authenticationService.editProfile(data, function (serverData) {
            $scope.navigateToPage(serverData.message);
            authenticationService.setProfileImage(profileImage);
        }, function (errorMessage) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
        });
    };

    $scope.changePassword = function () {
        var oldPassword = $scope.oldPassword;
        var newPassword = $scope.newPassword;
        var confirmPassword = $scope.confirmPassword;

        var data = {
            'oldPassword': oldPassword,
            'newPassword': newPassword,
            'confirmPassword' : confirmPassword
        };

        authenticationService.changePassword(data, function(successData) {
            $scope.navigateToPage('You have changed your password successfully');
        }, function(error) {
            notifyService.showError("The old password is incorrect", error);
        });
    };

    $scope.logout = function() {
        authenticationService.clearCredentials();
        $scope.navigateToPage('You have logged out successfully.');
    };

    $scope.isLogged = authenticationService.isLogged() ? true : false;
});