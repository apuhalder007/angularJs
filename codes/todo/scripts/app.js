var app = angular.module('todo-app', []);
app.controller('todosCtrl', function ($scope, $http) {
    $scope.todo = {};
    $scope.list = [];
    $scope.show = true;
    $scope.totalTodo = 0;
    $scope.todos = function () {
        $http({
            url: "http://localhost:3000/todo",
            method: "GET"

        }).then(function (response, status) {
            console.log(response.data);
            $scope.list = response.data;
            //$scope.totalTodo = $scope.list.length;
        });
    };
    $scope.todos();
    $scope.addTodo = function () {
        $scope.todo.id = $scope.totalTodo++;
        $http({
            url: "http://localhost:3000/todo",
            method: "POST",
            data: $scope.todo

        }).then(function (response, status) {
            console.log(response.data);
            $scope.todo = {};
        });
        $scope.todos();
    };

    $scope.deleteTodo = function (_id) {
        $http({
            url: "http://localhost:3000/todo/" + _id,
            method: "DELETE",

        }).then(function (response, status) {
            console.log(response.data);
        });
        $scope.todos();
    };

    $scope.editTodo = function (_todo) {
        $scope.show = false;
        $scope.todo = _todo;
    };

    $scope.updateTodo = function () {
        $http({
            url: "http://localhost:3000/todo/" + $scope.todo.id,
            method: "PATCH",
            data: {
                title: $scope.todo.title,
                status: $scope.todo.status
            }

        }).then(function (response, status) {
            console.log(response.data);
            $scope.todo = {};
        });
        console.log($scope.todo)
        $scope.todos();
    };
    $scope.cancelUpdate = function () {
        $scope.todo = {};
        $scope.show = !$scope.show;
    };
});