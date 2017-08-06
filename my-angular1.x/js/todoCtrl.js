/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		var todos = $scope.todos = store.todos;

		$scope.newTodo = '';

		$scope.addTodo = function () {
			console.log("add todo");
			let newTodo = {
				title: $scope.newTodo.trim()				
			};

			if (!newTodo.title) {
				return;
			}

			$scope.isSaving = true;

			store.insert(newTodo)
			.then(function success() {
				console.log("success");
				$scope.newTodo = '';
			}).finally(function () {
				$scope.isSaving = false;
			});
		}

		$scope.removeTodo = function (todo) {
			store.delete(todo);
		};
	});
