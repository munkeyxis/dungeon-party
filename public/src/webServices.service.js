(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('webServices', webServices);

    /* @ngInject */
    function webServices($http, $log, characterModel) {
        var service = {
            saveCharacter: saveCharacter
        };
        return service;

        ////////////////

        function saveCharacter() {
        	$http({
	            url: 'http://localhost:3000/save-character',
	            method: 'POST',
	            dataType: 'json',
	            data: characterModel.character,
	            headers: {'Content-Type': 'application/json'}
	        })
            .then(response => {
                $log.info('save response', response);
            });
        }
    }
})();