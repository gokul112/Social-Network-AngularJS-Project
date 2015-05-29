app.controller('AppController',
    function ($scope, authService, notifyService, $interval, userService, $location, $routeParams, profileService) {

        $scope.authService = authService;

        $scope.username = authService.getUsername();
        $scope.showPendingRequest = false;
        $scope.isOwnWall = authService.getUsername() === $routeParams['username'];
        $scope.isOwnFeed = $location.path() === '/';

        function getFriendRequests(){
            if (authService.isLoggedIn()){
                profileService(authService.getAccessToken()).getPendingRequests().$promise.then(
                    function(data){
                        $scope.pendingRequests = data;
                    }, function(error){
                        notifyService.showError("Failed to load friend requests!", error);
                    }
                );
            }
        }

        $scope.acceptFriendRequest = function(request){
            if (authService.isLoggedIn()){
                usSpinnerService.spin('spinner-1');
                profileService(authentication.getAccessToken()).acceptRequest(request.id).$promise.then(
                    function(){
                        var index =  $scope.pendingRequests.indexOf(request);
                        $scope.pendingRequests.splice(index,1);
                        notifyService.showInfo("Friend request successfully accepted.");
                    }, function(error){
                        notifyService.showError("Failed to accept friend request!", error);
                    }
                );
            }
        };

        $scope.rejectFriendRequest = function(request){
            if (authService.isLoggedIn()){

                profileService(authentication.getAccessToken()).rejectRequest(request.id).$promise.then(
                    function(){
                        var index =  $scope.pendingRequests.indexOf(request);
                        $scope.pendingRequests.splice(index,1);

                        notifyService.showInfo("Friend request successfully rejected.");
                    }, function(error){
                        notifyService.showError("Failed to reject friend request!", error);
                    }
                );
            }
        };

        $scope.logout = function() {
            authService.logout();
            notifyService.showInfo("Logout successful");
            $location.path('/');
        };
    }
);
