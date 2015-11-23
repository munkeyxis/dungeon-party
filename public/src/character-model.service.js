(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('characterModel', characterModel);

    /* @ngInject */
    function characterModel() {
        let character = {
            name: {name: ''},
            stats: [
                { name: "Strength", value: 10, modifier: 0 },
                { name: "Dexterity", value: 10, modifier: 0 },
                { name: "Constitution", value: 10, modifier: 0 },
                { name: "Intelligence", value: 10, modifier: 0 },
                { name: "Wisdom", value: 10, modifier: 0 },
                { name: "Charisma", value: 10, modifier: 0 }
            ],
            proficiencyBonus: 2
        };

        var service = {
            getName: getName,
            getStats: getStats,
            getProficiencyBonus: getProficiencyBonus,
            character: character
        };
        return service;

        ////////////////

        function getName() {
            return character.name;
        }

        function getStats() {
        	return character.stats;
        }

        function getProficiencyBonus() {
        	return character.proficiencyBonus;
        }
    }
})();