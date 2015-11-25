(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('primaryStat', primaryStat);

    var template = `
    	<div class="primary-stat">

    		<b>{{primaryStat.stat.name}}:</b>

    		{{primaryStat.stat.value}}

    		<span class="modifier">
    			Modifier: {{primaryStat.stat.modifier}}
    		</span>
            
        </div>
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