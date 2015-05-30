app.controller('AuthenticationController', function ($scope, authenticationService) {

    $scope.getUserData = function() {
        authenticationService.getDataAboutMe(function(serverData) {
            $scope.userData = {
                'username': serverData.username,
                'name': serverData.name,
                'email': serverData.email,
                'gender': serverData.gender,
                'profileImageData': serverData.profileImageData,
                'coverImageData': serverData.coverImageData
            };


        }, function () {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error retrieving the user data from the server');
        });
    };

    $scope.login= function() {
        var data = {
            'username': $scope.username,
            'password' :$scope.password
        };

        authenticationService.login(data, function (serverData) {
            authenticationService.setCredentials(serverData);
            authenticationService.getDataAboutMe(function(successData) {
                authenticationService.setName(successData.name);

                $scope.navigateToPage('You have logged in successfully.');
            }, function() {
                poppy.pop('error',
                    'Error',
                    'An error occured while trying to connect to the server. Please try again later');
            })

        }, function (error) {

            poppy.pop('error', 'Error', 'The username or password are incorrect. Please try again.');
        });
    }

    $scope.register = function() {

        var data = {
            'username': $scope.username,
            'password': $scope.password,
            'confirmPassword': $scope.confirmPassword,
            'name': $scope.name,
            'email' : $scope.email,
            'gender' : $scope.gender
        }

        authenticationService.register(data, function (serverData) {
            authenticationService.setCredentials(serverData);

            $scope.navigateToPage('You have registered successfully.');
        }, function(error) {
            poppy.pop('error', 'Error', error.message);
        });
    }

    $scope.editProfile = function() {
        var data = {};

        data['name'] = $scope.userData.name;;
        data['email'] = $scope.userData.email;
        data['profileImageData'] = $('#coverPictureData').attr('src');
        data['coverImageData'] = $('#profilePictureData').attr('src');
        data['gender'] = $("input:radio[name=gender-radio]:checked").val();

        authenticationService.editProfile(data, function (serverData) {
            $scope.navigateToPage(serverData.message);

            authenticationService.setProfileImage(profileImage);
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'An error occured while trying to edit the profile');
        });
    }

    $scope.changePassword = function () {
        var oldPassword = $scope.oldPassword;
        var newPassword = $scope.newPassword;
        var confirmPassword = $scope.confirmPassword;

        if (newPassword !== confirmPassword) {
            poppy.pop('error', 'Error', 'The passwords don\'t match');
            return;
        } else if (newPassword.length < 6) {
            poppy.pop('error', 'Error', 'The password length must be atleast 6 characters long');
            return;
        }

        var data = {
            'oldPassword': oldPassword,
            'newPassword': newPassword,
            'confirmPassword' : confirmPassword
        }

        authenticationService.changePassword(data, function(successData) {
            $scope.navigateToPage('You have changed your password successfully');
        }, function(error) {
            poppy.pop('error', 'Error', 'The old password is incorrect');
        });
    }

    $scope.logout = function() {
        authenticationService.clearCredentials();
        $scope.navigateToPage('You have logged out successfully.');
    }

    $scope.isLogged = authenticationService.isLogged() ? true : false;
});