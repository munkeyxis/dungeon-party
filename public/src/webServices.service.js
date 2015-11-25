(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('webServices', webServices);

    /* @ngInject */
    function webServices($http, $log) {
        var service = {
            saveCharacter: saveCharacter,
            getCharacters: getCharacters
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

        function getCharacters() {
        	let promise = $http({
				method: 'GET',
				url: 'http://localhost:3000/character-data'
			})
			.then(response => {
				$log.info('getCharacters success', response);
				return response.data;
			});

			return promise;
        }
    }
})();