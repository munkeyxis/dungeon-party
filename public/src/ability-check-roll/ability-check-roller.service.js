(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('abilityCheckRoller', abilityCheckRoller);

    /* @ngInject */
    function abilityCheckRoller() {
        var service = {
            rollAbilityCheck: rollAbilityCheck
        };
        return service;

        ////////////////

        function rollAbilityCheck(abilityMod, proficiencyBonus, isProficient) {
        	const rollResult = rollD20();
        	let totalResult = rollResult + abilityMod;

            if(isProficient) {
                totalResult += proficiencyBonus;
            }

        	return {
        		rollResult: rollResult,
        		totalResult: totalResult
        	};
        }

        function rollD20() {
	    	const min = 1;
	    	const max = 20;

        	return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
})();
