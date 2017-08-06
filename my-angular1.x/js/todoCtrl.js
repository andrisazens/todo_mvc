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

		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ isCompleted: false } : (status === 'completed') ?
					{ isCompleted: true } : {};
		});

		$scope.addTodo = function () {
			let newTodo = {
				title: $scope.newTodo.trim(),
				isCompleted: false
			};

			if (!newTodo.title) {
				return;
			}

			$scope.isSaving = true;

			store.insert(newTodo)
				.then(function success() {
					$scope.newTodo = '';
				}).finally(function () {
					$scope.isSaving = false;
				});
		}

		$scope.removeTodo = function (todo) {
			store.delete(todo);
		};

		$scope.toggleCompleted = function (todo, isCompleted) {
			if (angular.isDefined(isCompleted)) {
				todo.isCompleted = isCompleted;
			}
			store.update(todo, todos.indexOf(todo))
				.then(
				function success() { },
				function error() {
					todo.isCompleted = !todo.isCompleted;
				});
		}

		$scope.markAll = function(isAllChecked) {
			
		}
	});
