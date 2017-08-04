/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		$scope.newTodo = null;
		$scope.addTodo = function () {
			let newTodo = {
				title: $scope.newTodo.trim()
			};

			store.insert(newTodo)
			.then(function success() {

			}).finally(function () {

			});
		}
	});
