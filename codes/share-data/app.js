var app = angular.module('share-data',[]);
app.controller('like-ctrl', function($scope, likeCounterService){
    $scope.like = 0;
    $scope.incrementLike = function () {
        likeCounterService.setLikeCount($scope.like++)
    }
});

app.controller('like-counter-ctrl', function($scope, likeCounterService){
    $scope.count = likeCounterService.likeCount
    $scope.$on('brodcastLikes', function(){
        $scope.count = likeCounterService.likeCount
    });
    
});

app.factory('likeCounterService', function($rootScope){
    return {
        likeCount : 0,
        setLikeCount: function(like){
            this.likeCount = like
            this.getLikeCount()
            console.log(this.likeCount)
        },
        getLikeCount: function(){
            $rootScope.$broadcast('brodcastLikes')
        }
    }
});

