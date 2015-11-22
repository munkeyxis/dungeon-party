(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('primaryStats', primaryStats);

    var template = `
        
    	<primary-stat stat-obj="stat" 
            ng-repeat-start="stat in primaryStats.stats"></primary-stat>

        <ability-check-roll 
            ng-repeat-end
            ability-mod="stat.modifier"></ability-check-roll>
    `;

    /* @ngInject */
    function primaryStats() {
        var directive = {
            bindToController: true,
            controller: PrimaryStatsController,
            controllerAs: 'primaryStats',
            restrict: 'E',
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function PrimaryStatsController(characterModel) {
    	const vm = this;

        vm.stats = characterModel.getStats();
    }
})();