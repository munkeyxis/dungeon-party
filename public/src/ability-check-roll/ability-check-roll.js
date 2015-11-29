(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('abilityCheckRoll', abilityCheckRoll);

    var template = `
    	<button ng-click="abilityCheckRoll.rollAttack()">
            Roll Ability Check
        </button>
    `;

    /* @ngInject */
    function abilityCheckRoll() {
        var directive = {
            bindToController: true,
            controller: AbilityCheckRollController,
            controllerAs: 'abilityCheckRoll',
            restrict: 'E',
            scope: {
            	abilityMod: '=',
                proficiencyBonus: '=',
                isProficient: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function AbilityCheckRollController(socket, abilityCheckRoller) {
    	const vm = this;
    	const min = 1;
    	const max = 20;

    	vm.rollAttack = () => {
            let attackRollResults = abilityCheckRoller.rollAbilityCheck(
                vm.abilityMod,
                vm.proficiencyBonus,
                vm.isProficient
            );
    		vm.rollValue = attackRollResults.rollResult;
    		vm.totalValue = attackRollResults.totalResult;
            socket.emit('roll', vm.totalValue);
    	};
    }
})();
