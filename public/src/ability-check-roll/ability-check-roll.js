(function() {
    'use strict';

    angular
        .module('characterSheet')
        .directive('abilityCheckRoll', abilityCheckRoll);

    var template = `
    	<button ng-click="abilityCheckRoll.rollAttack()">
            {{abilityCheckRoll.text}}
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
                buttonText: '=',
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

        vm.text = vm.buttonText || 'Roll Ability Check'

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
