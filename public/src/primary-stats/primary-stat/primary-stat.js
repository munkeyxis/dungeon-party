(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('primaryStat', primaryStat);

    var template = `
    	<div class="primary-stat">

    		<label>{{primaryStat.stat.name}}:</label>

    		<input type="number" min="8"
    			ng-change="primaryStat.calculateModifier()" 
				ng-model="primaryStat.stat.value">

    		<span class="modifier">
    			{{primaryStat.stat.modifier}}
    		</span>
            
        </div>
    `;

    /* @ngInject */
    function primaryStat() {
        var directive = {
            bindToController: true,
            controller: PrimaryStatController,
            controllerAs: 'primaryStat',
            restrict: 'E',
            scope: {
                stat: '=statObj'
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function PrimaryStatController(modifierCalculator) {
    	var vm = this;

    	vm.calculateModifier = () => { assignModifier(); };

    	activate();

    	function activate() {
    		assignModifier();
    	}

    	function assignModifier() {
    		vm.stat.modifier = modifierCalculator.calculateModifier(vm.stat.value);
    	}
    }
})();