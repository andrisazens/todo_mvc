/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')
	.factory('todoStorage', function ($http, $injector) {
		'use strict';

		// var deferred = $q.defer();
		// deferred.resolve($injector.get('localStorage'));
		// return deferred.promise;
		return $http.get('/api')
			.then(function () {
				return $injector.get('api');
			}, function () {
				return $injector.get('localStorage');
			});
	}).factory('api', function ($resource) {
		'use strict';

		var store = {
			todos: []			
		};

		return store;
	}).factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'todos-angularjs';

		var store = {
			todos: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (todos) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
			},

			insert: function (todo) {	
				var deferred = $q.defer();
							
				store.todos.push(todo);
				store._saveToLocalStorage(store.todos);

				deferred.resolve(true);
				return deferred.promise;
			},

			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},

			delete: function (todo) {	
				store.todos.splice(store.todos.indexOf(todo), 1);
				store._saveToLocalStorage(store.todos);
			},

			update: function (todo, index) {
				var deferred = $q.defer();

				store.todos[index] = todo;
				store._saveToLocalStorage(store.todos);

				deferred.resolve(true);

				return deferred.promise;
			}
		};

		return store;
	});	
