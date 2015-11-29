(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('primaryStat', primaryStat);

    var template = `
        <value-group>
            <stat-name>{{primaryStat.stat.name}}</stat-name>
            <stat-value>{{primaryStat.stat.value}}</stat-value>
        </value-group>
        <stat-modifier>
            Mod: {{primaryStat.stat.modifier}}
        </stat-modifier>
    `;

    /* @ngInject */
    function primaryStat() {
        var directive = {
            bindToController: true,
            controller: angular.noop,
            controllerAs: 'primaryStat',
            restrict: 'E',
            scope: {
                stat: '=statObj'
            },
            template: template
        };
        return directive;
    }
})();