(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('characterModel', characterModel);

    characterModel.$inject = [];

    /* @ngInject */
    function characterModel() {
    	let stats = [
    		{ name: "Strength", value: 10, modifier: 0 },
    		{ name: "Dexterity", value: 10, modifier: 0 },
    		{ name: "Constitution", value: 10, modifier: 0 },
    		{ name: "Intelligence", value: 10, modifier: 0 },
    		{ name: "Wisdom", value: 10, modifier: 0 },
    		{ name: "Charisma", value: 10, modifier: 0 },
    	];

    	let proficiencyBonus = 2;

        var service = {
            getStats: getStats,

            getProficiencyBonus: getProficiencyBonus
        };
        return service;

        ////////////////

        function getStats() {
        	return stats;
        }

        function getProficiencyBonus() {
        	return proficiencyBonus;
        }
    }
})();