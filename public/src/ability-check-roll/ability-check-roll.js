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
                characterGuid: '=',
                buttonText: '=',
                statName: '=',
                isProficient: '='
            },
            template: template
        };
        return directive;
    }

    /* @ngInject */
    function AbilityCheckRollController(webServices) {
        const vm = this;

        vm.text = vm.buttonText || 'Roll Ability Check';

        vm.rollOptions = {
            characterGuid: vm.characterGuid,
            diceTypes: [{value: 20, isSelected: true, quantity: 1}],
            statTypes: [{name: vm.statName, isSelected: true}],
            otherModValue: 0
        };

        vm.rollAttack = () => {
            vm.rollOptions.addProficiency = vm.isProficient;

            webServices.submitRoll(vm.rollOptions);
        };
    }
})();
