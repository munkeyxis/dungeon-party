(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('modifierCalculator', modifierCalculator);

    /* @ngInject */
    function modifierCalculator() {
        var service = {
            calculateModifier: calculateModifier
        };
        return service;

        ////////////////

        function calculateModifier(statValue) {
            return Math.floor((statValue - 10) / 2);
        }
    }
})();