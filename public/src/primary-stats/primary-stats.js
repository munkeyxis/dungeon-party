(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('primaryStats', primaryStats);

    var template = `
        <primary-stat 
            stat-obj="stat" 
            ng-repeat="stat in primaryStats.stats">
        </primary-stat>
    `;

    /* @ngInject */
    function primaryStats() {
        var directive = {
            bindToController: true,
            controller: PrimaryStatsController,
            controllerAs: 'primaryStats',
            restrict: 'E',
            scope: {
                stats: '=characterStats'
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function PrimaryStatsController() {
    	const vm = this;
    }
})();