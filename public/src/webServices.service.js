(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('webServices', webServices);

    /* @ngInject */
    function webServices($http, $log) {
        var service = {
            saveCharacter: saveCharacter,
            getCharacter: getCharacter
        };
        return service;

        ////////////////

        function saveCharacter(character) {
        	$http({
	            url: 'http://localhost:3000/save-character',
	            method: 'POST',
	            dataType: 'json',
	            data: character,
	            headers: {'Content-Type': 'application/json'}
	        })
            .then(response => {
                $log.info('save response', response);
            });
        }

        function getCharacter() {
        	let promise = $http({
				method: 'GET',
				url: 'http://localhost:3000/character-data'
			})
			.then(response => {
				$log.info('getCharacter success', response);
				return response.data;
			});

			return promise;
        }
    }
})();